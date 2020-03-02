import React, { Fragment } from "react";
import cartImage from "./cart.png";
import { connect } from "react-redux";
import { toggleCart } from "../../actions/cart";

const CartImg = ({ cart: { cart }, toggleCart, itemCount }) => (
  <Fragment>
    <div
      className='image-cart'
      style={{
        width: "40px",
        position: "relative"
      }}
    >
      <img
        src={cartImage}
        style={{
          width: "40px",
          margin: "auto",
          display: "block",
          position: "relative"
        }}
        alt='Cart'
        onClick={e => toggleCart()}
      />
      <span
        style={{
          position: "absolute",
          top: "0",
          left: "30%"
        }}
      >
        {itemCount}
      </span>
    </div>
  </Fragment>
);

CartImg.propTypes = {};
const mapStateToProps = state => {
  return {
    cart: state.cart,
    itemCount: state.cart.cart.reduce(
      (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.count,
      0
    )
  };
};
export default connect(mapStateToProps, { toggleCart })(CartImg);
