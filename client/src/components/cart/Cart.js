import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartItem from "./CartItem.js";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";

const Cart = ({ cart: { cart, loading }, getCart }) => {
  useEffect(() => {
    getCart();
  }, [getCart]);
  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      {cart.length > 0 ? (
        <div className='posts'>
          {cart.map(cartItem => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}
        </div>
      ) : (
        <h1>No items found!</h1>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps, { getCart })(Cart);
