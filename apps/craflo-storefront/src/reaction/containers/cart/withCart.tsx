import React from "react";
import useCarts from "hooks/cart/useCarts";
import hoistNonReactStatic from "hoist-non-react-statics";
import {CartItem} from "../../../components/cart-item/cart-item/cart-item";


/**
 * withCart higher order query component for creating, fetching, and updating carts
 * @name WithCart
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default function withCart(Component) {
  function WithCart(props) { // eslint-disable-line require-jsdoc

    const cartCollection = useCarts()
    return (
      <Component {...props} cartCollection={cartCollection}/>
    );
  }

  hoistNonReactStatic(WithCart, Component);

  return WithCart;
}
