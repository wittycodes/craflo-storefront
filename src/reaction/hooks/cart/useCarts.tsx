import { useEffect, useMemo, useCallback, useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import useStores from "hooks/useStores";
import useCart from "hooks/cart/useCart";
const ANONYMOUS_CART_ID_KEY_NAME = "_ANONYMOUS_CART_ID_";
const ANONYMOUS_CART_TOKEN_KEY_NAME = "_ANONYMOUS_CART_TOKEN_";


/**
 * Hook to get all carts information
 *
 * @returns {Object} the user's current cart
 */
export default function useCarts() {
  // const [cartCollection, setCartCollection] = useState({
  //   shop:{},
  //   totalItemQuantity: 0,
  //   totalPrice: 0
  // })
  //
  // useEffect(() => {
  //
  //   for (let i = 0; i < localStorage.length; i++) {
  //     if (localStorage.key(i).substring(0, ANONYMOUS_CART_ID_KEY_NAME.length) == ANONYMOUS_CART_ID_KEY_NAME) {
  //       const shopId = localStorage.key(i).split("_").pop()
  //       const getCart = useCart(shopId)
  //       setCartCollection({[shopId]: getCart})
  //     }
  //   }
  //
  //   Object.keys(cartCollection.shop).map((key, index) => {
  //     cartCollection.shop[key]()?.items?.map((item) => {
  //       setCartCollection({totalItemQuantity:  cartCollection.totalItemQuantity + 1});
  //     })
  //     setCartCollection({totalPrice: (cartCollection.shop[key]()?.checkout ?
  //         cartCollection.shop[key]().checkout.summary.total.amount : 0) + cartCollection.totalPrice})
  //   })
  // }, [])
  // console.log(cartCollection, "GHATIA")

  let cartCollection = {
    shop:{},
    totalItemQuantity: 0,
    totalPrice: 0
  }

  if (typeof window !== 'undefined') {

    const anonymous_cart_ids = JSON.parse(localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME) || "{}")
    // const tokens = JSON.parse(localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME))

    for(const shopId in anonymous_cart_ids){
      const cart = useCart(shopId)
      cartCollection.shop[shopId] = cart
    }

    Object.keys(cartCollection.shop).map((key, index) => {
      cartCollection.shop[key]?.cart?.items?.map((item) => {
        cartCollection.totalItemQuantity += 1;
      })
      cartCollection.totalPrice += (cartCollection.shop[key]?.cart?.checkout ? cartCollection.shop[key].cart.checkout.summary.total.amount : 0)
    })

  }
  console.log(cartCollection, "GHATIA")
  return {
    ...cartCollection
  }
}
