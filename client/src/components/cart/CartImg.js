import React, { Fragment } from "react";
import cart from "./cart.png";

const CartImg = () => (
  <Fragment>
    <img
      src={cart}
      style={{ width: "100px", margin: "auto", display: "block" }}
      alt='Cart'
    />
  </Fragment>
);
export default CartImg;
