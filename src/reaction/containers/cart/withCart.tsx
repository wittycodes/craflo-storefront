import React from "react";
import useCart from "hooks/cart/useCart";
import hoistNonReactStatic from "hoist-non-react-statics";


/**
 * withCart higher order query component for creating, fetching, and updating carts
 * @name WithCart
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default function withCart(Component) {
  function WithCart(props) { // eslint-disable-line require-jsdoc

    const cart = useCart("cmVhY3Rpb24vc2hvcDpvRXNybmM5bXFCRHZ0NTJUVw==")


    return (
      <Component {...props} cartCollection={cart}/>
    );
  }

  hoistNonReactStatic(WithCart, Component);

  return WithCart;
}
