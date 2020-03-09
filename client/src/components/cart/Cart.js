import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";
import CartItem from "./CartItem";
import CheckoutItem from "./CheckoutItem";

const Cart = ({ cart: { cart, loading }, getCart, itemCount, total }) => {
  useEffect(() => {
    getCart();
  }, [getCart]);
  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      {cart.length ? (
        <div className='checkout-page'>
          <div className='checkout-header'>
            <div className='header-block'>
              <span>Product</span>
            </div>
            <div className='header-block'>
              <span>Description</span>
            </div>
            <div className='header-block'>
              <span>Quantity</span>
            </div>
            <div className='header-block'>
              <span>Price</span>
            </div>
            <div className='header-block'>
              <span>Remove</span>
            </div>
          </div>
          {cart.map(cartItem => (
            <CheckoutItem key={cartItem._id} cartItem={cartItem} />
          ))}
          <div className='total'>
            <span>{total}</span>
          </div>
          <div className='total'>
            <span>Tax: 13%</span>
          </div>
          <div className='total grand-total'>
            <span>{total + 0.13 * total}</span>
          </div>
        </div>
      ) : (
        <h1>No Items Found</h1>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    cart: state.cart,
    itemCount: state.cart.cart.reduce(
      (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.count,
      0
    ),
    total: state.cart.cart.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.count * cartItem.prouductPrice,
      0
    )
  };
};
export default connect(mapStateToProps, { getCart })(Cart);
