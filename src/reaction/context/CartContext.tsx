import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ANONYMOUS_CART_ID_KEY_NAME = "_ANONYMOUS_CART_ID_";
const ANONYMOUS_CART_TOKEN_KEY_NAME = "_ANONYMOUS_CART_TOKEN_";

export const CartContext = createContext({} as any);

export const CartProvider = ({ children }) => {
  const [anonymousCartId, setAnonymousCartId] = useState({});
  const [anonymousCartToken, setAnonymousCartToken] = useState({});
  const [accountCartId, setAccountCartId] = useState({});
  const [isReconcilingCarts, setIsReconcilingCarts] = useState(false);
  const [checkoutPayments, setCheckoutPayments] = useState([]);

  const setAnonymousCartCredentials = (newAnonymousCartId, newAnonymousCartToken,shopId) => {

    console.log(newAnonymousCartId, newAnonymousCartToken, shopId)
    setAnonymousCartId({
      [shopId]: newAnonymousCartId || null
    });
    setAnonymousCartToken({
      [shopId]: newAnonymousCartToken || null
    });

    if (typeof newAnonymousCartId === "string" && newAnonymousCartId.length) {
      // Save to local storage
      localStorage.setItem(ANONYMOUS_CART_ID_KEY_NAME, JSON.stringify({...JSON.parse(localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME) || "{}"), [shopId]: newAnonymousCartId}));
      localStorage.setItem(ANONYMOUS_CART_TOKEN_KEY_NAME, JSON.stringify({...JSON.parse(localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME) || "{}"), [shopId]: newAnonymousCartToken}));

      // Save cookies
      Cookies.set(ANONYMOUS_CART_ID_KEY_NAME, JSON.stringify({...JSON.parse(Cookies.get(ANONYMOUS_CART_ID_KEY_NAME) || "{}"), [shopId]: newAnonymousCartId}));
      Cookies.set(ANONYMOUS_CART_TOKEN_KEY_NAME, JSON.stringify({...JSON.parse(Cookies.get(ANONYMOUS_CART_TOKEN_KEY_NAME) || "{}"), [shopId]: newAnonymousCartToken}));
    } else {
      // Remove from local storage
      localStorage.setItem(ANONYMOUS_CART_ID_KEY_NAME, JSON.stringify({...JSON.parse(localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME) || "{}"), shopId}));
      localStorage.setItem(ANONYMOUS_CART_TOKEN_KEY_NAME, JSON.stringify({...JSON.parse(localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME) || "{}"), shopId}));

      // Remove cookies
      Cookies.set(ANONYMOUS_CART_ID_KEY_NAME, JSON.stringify({...JSON.parse(Cookies.get(ANONYMOUS_CART_ID_KEY_NAME)  || "{}"), shopId}));
      Cookies.set(ANONYMOUS_CART_TOKEN_KEY_NAME, JSON.stringify({...JSON.parse(Cookies.get(ANONYMOUS_CART_TOKEN_KEY_NAME) || "{}"), shopId}));
    }
  };

  const clearAnonymousCartCredentials = (shopId) => {
    setAnonymousCartCredentials(null, null, shopId);
  };

  const setAnonymousCartCredentialsFromLocalStorage = () => {
    // const anonymousCartId = localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME + shopId); // eslint-disable-line no-shadow
    // const anonymousCartToken = localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME + shopId); // eslint-disable-line no-shadow
    const ids = JSON.parse(localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME) || "{}")
    const tokens = JSON.parse(localStorage.getItem(ANONYMOUS_CART_TOKEN_KEY_NAME) || "{}")

    for(const shop in ids) {
      console.log(shop, ids, "uuuuu")
        setAnonymousCartCredentials(ids[shop], tokens[shop], shop);
    }

  };

  useEffect(() => {
    setAnonymousCartCredentialsFromLocalStorage();
  }, []);

  const addCheckoutPayment = (value) => {
    setCheckoutPayments([...checkoutPayments, value]);
  };

  const setCheckoutPayment = (value) => {
    setCheckoutPayments([value]);
  };

  const resetCheckoutPayments = () => {
    setCheckoutPayments([]);
  };

  return (
    <CartContext.Provider value={{
      anonymousCartId,
      anonymousCartToken,
      accountCartId,
      isReconcilingCarts,
      checkoutPayments,
      setAnonymousCartCredentials,
      clearAnonymousCartCredentials,
      setAnonymousCartCredentialsFromLocalStorage,
      setIsReconcilingCarts,
      hasAnonymousCartCredentials:  (shopId) =>  (anonymousCartId[shopId] && anonymousCartToken[shopId]) || false,
      hasAccountCart: (shopId) => typeof accountCartId[shopId] === "string",
      setAccountCartId,
      addCheckoutPayment,
      setCheckoutPayment,
      resetCheckoutPayments
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node
};
