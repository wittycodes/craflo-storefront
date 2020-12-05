import { useEffect, useMemo, useCallback } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useMerchantShop from "hooks/shop/useMerchantShop";
import useViewer from "hooks/viewer/useViewer";
import cartItemsConnectionToArray from "lib/utils/cartItemsConnectionToArray";
import {
  createCartMutation,
  addCartItemsMutation,
  removeCartItemsMutation,
  reconcileCartsMutation,
  setEmailOnAnonymousCartMutation,
  setFulfillmentOptionCartMutation,
  setShippingAddressCartMutation,
  updateCartItemsQuantityMutation,
  updateFulfillmentOptionsForGroup
} from "./mutations.gql";
import {
  accountCartByAccountIdQuery,
  anonymousCartByCartIdQuery
} from "./queries.gql";


/**
 * Hook to get cart information
 *
 * @returns {Object} the user's current cart
 */
export default function useCart(shopId: string) {
  const { cartStore } = useStores();
  const [viewer, isLoadingViewer] = useViewer();

  const apolloClient = useApolloClient();
  const accountId = viewer && viewer._id;

  const shouldSkipAccountCartByAccountIdQuery = Boolean(!accountId || cartStore.hasAnonymousCartCredentials(shopId) || isLoadingViewer || !shopId);
  const shouldSkipAnonymousCartByCartIdQuery = Boolean(accountId || isLoadingViewer || !cartStore.anonymousCartId[shopId] || !cartStore.anonymousCartToken[shopId]);




  const { loading: isLoading, data: cartData, fetchMore, refetch: refetchCart } = useQuery(accountCartByAccountIdQuery, {
    skip: shouldSkipAccountCartByAccountIdQuery,
    variables: {
      accountId,
      shopId: shopId
    },
    pollInterval: shouldSkipAccountCartByAccountIdQuery ? 0 : 2000
  });

  const { data: cartDataAnonymous, refetch: refetchCartAnonymous } = useQuery(anonymousCartByCartIdQuery, {
    skip: shouldSkipAnonymousCartByCartIdQuery,
    variables: {
      cartId: cartStore.anonymousCartId[shopId],
      cartToken: cartStore.anonymousCartToken[shopId]
    },
    pollInterval: shouldSkipAnonymousCartByCartIdQuery ? 0 : 2000
  });



  useEffect(() => {
    if (!shouldSkipAccountCartByAccountIdQuery) {
      refetchCart();
    }
    if (!shouldSkipAnonymousCartByCartIdQuery) {
      refetchCartAnonymous();
    }
  }, [viewer, refetchCart]);








  const cart = useMemo(() => {
    if (!shouldSkipAccountCartByAccountIdQuery && cartData) {
      return cartData.cart;
    }
    if (!shouldSkipAnonymousCartByCartIdQuery && cartDataAnonymous) {
      return cartDataAnonymous.cart;
    }

    return {};
  }, [cartData, cartDataAnonymous, shouldSkipAccountCartByAccountIdQuery, shouldSkipAnonymousCartByCartIdQuery]);


  const pageInfo = useMemo(() => {
    if (cart && cart.items) return cart.items.pageInfo;
    return {};
  }, [cart]);



  // With an authenticated cart, set the accountCartId for later use
  useEffect(() => {
    if (cart && cart.account && cart.account._id === (viewer && viewer._id)) {
      cartStore.setAccountCartId({
        [shopId]: cart._id
      });
    } else {
      cartStore.setAccountCartId({
        [shopId]: null
      });
    }
  }, [cart, cartStore.setAccountCartId, viewer]);








  const cartIdAndCartToken = () => {
    const { accountCartId, anonymousCartId, anonymousCartToken } = cartStore;
    let cartToken = {};
    if (!accountCartId[shopId]) {
      cartToken = { cartToken: anonymousCartToken[shopId] };
    }

    return {
      cartId: accountCartId[shopId] || anonymousCartId[shopId],
      ...cartToken
    };
  };





  const [addOrCreateCartMutation, {
    loading: addOrCreateCartLoading
  }] = useMutation(cart && cart._id ? addCartItemsMutation : createCartMutation, {
    onCompleted(addOrCreateCartMutationData) {
      if (addOrCreateCartMutationData && addOrCreateCartMutationData.createCart && (!viewer || !viewer._id)) {
        const { cart: cartPayload, token } = addOrCreateCartMutationData.createCart;
        //--console.log(addOrCreateCartMutationData)
        cartStore.setAnonymousCartCredentials(cartPayload._id, token, shopId);
      }
      refetchCart();
    }
  });

  const [removeCartItemsMutationFun, {
    loading: removeCartItemsLoading
  }] = useMutation(removeCartItemsMutation, {
    update(cache, { data: mutationData }) {
      if (mutationData && mutationData.removeCartItems) {
        const { cart: cartPayload } = mutationData.removeCartItems;

        if (cartPayload) {
        // Update Apollo cache
          cache.writeQuery({
            query: cartPayload.account ? accountCartByAccountIdQuery : anonymousCartByCartIdQuery,
            data: { cart: cartPayload }
          });
        }
      }
    }
  });

  const handleRemoveCartItems = useCallback(async (itemIds) => removeCartItemsMutationFun({
    variables: {
      input: {
        cartId: cartStore.anonymousCartId[shopId] || cartStore.accountCartId[shopId],
        cartItemIds: (Array.isArray(itemIds) && itemIds) || [itemIds],
        cartToken: cartStore.anonymousCartToken[shopId] || null
      }
    }
  }), [cartStore.anonymousCartId[shopId], cartStore.accountCartId[shopId], cartStore.anonymousCartToken[shopId]]);


  const handleAddItemsToCart = async (data, isCreating) => {
    const input = {
      items: data.items
    };

    if (!isCreating && (!viewer || !viewer._id) && cartStore.hasAnonymousCartCredentials(shopId)) {
      // Given an anonymous user, with a cart, add token and cartId to input
      const { anonymousCartId, anonymousCartToken } = cartStore;

      // Add items to an existing anonymous cart
      input.cartToken = anonymousCartToken[shopId];
      input.cartId = anonymousCartId[shopId];

    } else if (!isCreating && viewer && viewer._id && cartStore.hasAccountCart(shopId)) {
      // With an account and an account cart, set the accountCartId on the input object
      input.cartId = cartStore.accountCartId[shopId];
    } else if (isCreating) {
      // With no anonymous or account cart, add shop Id to input as it will be needed for the create cart mutation
      input.shopId = shopId;
    }

    // Run the mutation function provided as a param.
    // It may take the form of `createCart` or `addCartItems` depending on the
    // availability of a cart for either an anonymous or logged-in account.
    return addOrCreateCartMutation({
      variables: {
        input
      }
    });
  };

  const handleUpdateFulfillmentOptionsForGroup = async (fulfillmentGroupId) => {
    await apolloClient.mutate({
      mutation: updateFulfillmentOptionsForGroup,
      variables: {
        input: {
          ...cartIdAndCartToken(),
          fulfillmentGroupId
        }
      }
    });
  };






  // If we are authenticated, reconcile carts
  useEffect(() => {
    if (cartStore.hasAnonymousCartCredentials(shopId) && viewer && viewer._id && cartStore.isReconcilingCarts === false) {
      // Prevent multiple calls to reconcile cart mutations when one is currently in progress
      cartStore.setIsReconcilingCarts(true);

      apolloClient.mutate({
        mutation: reconcileCartsMutation,
        update: (cache, { data: mutationData }) => {
          // If the mutation data contains a createCart object and we are an anonymous user,
          // then set the anonymous cart details
          if (mutationData && mutationData.reconcileCarts) {
            const { cart: cartPayload } = mutationData.reconcileCarts;

            if (cartPayload) {
              // Clear anonymous account credentials
              cartStore.clearAnonymousCartCredentials(shopId);

              // Update cache for account cart query
              cache.writeQuery({
                query: accountCartByAccountIdQuery,
                data: { cart: cartPayload }
              });

              // Refetch cart
              refetchCart && refetchCart();
            }
          }
          cartStore.setIsReconcilingCarts(false);
        },
        variables: {
          input: {
            anonymousCartId: cartStore.anonymousCartId[shopId],
            cartToken: cartStore.anonymousCartToken[shopId],
            shopId: shopId
          }
        }
      });
    }
  }, [viewer, () => cartStore.hasAnonymousCartCredentials(shopId), cartStore.isReconcilingCarts, apolloClient]);

  let processedCartData = null;
  if (cart) {
    processedCartData = {
      ...cart,
      items: cartItemsConnectionToArray(cart.items)
    };
  }

  return {
    addItemsToCart: (items) => handleAddItemsToCart({ items }, !cart || !cart._id),
    addOrCreateCartLoading,
    cart: processedCartData,
    checkoutMutations: {
      onSetFulfillmentOption: async ({ fulfillmentGroupId, fulfillmentMethodId }) => {
        const cartIdData = cartIdAndCartToken();

        if (!cartIdData.cartId) return null;

        const response = await apolloClient.mutate({
          mutation: setFulfillmentOptionCartMutation,
          variables: {
            input: {
              ...cartIdData,
              fulfillmentGroupId,
              fulfillmentMethodId
            }
          }
        });

        return response;
      },
      onSetShippingAddress: async (address) => {
        const response = await apolloClient.mutate({
          mutation: setShippingAddressCartMutation,
          variables: {
            input: {
              ...cartIdAndCartToken(),
              address
            }
          }
        });

        // Update fulfillment options for current cart
        const { data: { setShippingAddressOnCart } } = response;
        handleUpdateFulfillmentOptionsForGroup(setShippingAddressOnCart.cart.checkout.fulfillmentGroups[0]._id);

        return response;
      }
    },
    hasMoreCartItems: (pageInfo && pageInfo.hasNextPage) || false,
    isLoadingCart: isLoadingViewer || isLoading,
    loadMoreCartItems: () => {
      fetchMore({
        variables: {
          itemsAfterCursor: (pageInfo && pageInfo.endCursor) || null
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const { cart: fetchMoreCart } = fetchMoreResult;

          // Check for additional items from result
          if (fetchMoreCart && fetchMoreCart.items && Array.isArray(fetchMoreCart.items.edges) && fetchMoreCart.items.edges.length) {
            // Merge previous cart items with next cart items
            return {
              ...fetchMoreResult,
              cart: {
                ...fetchMoreCart,
                items: {
                  __typename: previousResult.cart.items.__typename,
                  pageInfo: fetchMoreCart.items.pageInfo,
                  edges: [
                    ...previousResult.cart.items.edges,
                    ...fetchMoreCart.items.edges
                  ]
                }
              }
            };
          }

          // Send the previous result if the new result contains no additional data
          return previousResult;
        }
      });
    },
    onChangeCartItemsQuantity: async (cartItems) => {
      await apolloClient.mutate({
        mutation: updateCartItemsQuantityMutation,
        variables: {
          input: {
            cartId: cartStore.anonymousCartId[shopId] || cartStore.accountCartId[shopId],
            items: (Array.isArray(cartItems) && cartItems) || [cartItems],
            cartToken: cartStore.anonymousCartToken[shopId] || null
          }
        },
        update: (cache, { data: mutationData }) => {
          if (mutationData && mutationData.updateCartItemsQuantity) {
            const { cart: cartPayload } = mutationData.updateCartItemsQuantity;

            if (cartPayload) {
              // Update Apollo cache
              cache.writeQuery({
                query: cartPayload.account ? accountCartByAccountIdQuery : anonymousCartByCartIdQuery,
                data: { cart: cartPayload }
              });
            }
          }
        }
      });
    },
    onRemoveCartItems: handleRemoveCartItems,
    removeCartItemsLoading,
    clearAuthenticatedUsersCart: () => {
      if (viewer && viewer._id) {
        apolloClient.cache.writeQuery({
          query: accountCartByAccountIdQuery,
          data: { cart: null },
          variables: {
            accountId: viewer && viewer._id,
            shopId: shopId
          }
        });
      }
    },
    refetchCart,
    setEmailOnAnonymousCart: async ({ email }) => {
      await apolloClient.mutate({
        mutation: setEmailOnAnonymousCartMutation,
        variables: {
          input: {
            ...cartIdAndCartToken(),
            email
          }
        }
      });
    }
  };
}
