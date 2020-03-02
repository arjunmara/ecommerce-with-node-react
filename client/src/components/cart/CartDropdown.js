import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCart } from "../../actions/cart";

const CartDropdown = ({ cart, history, toggleCart }) => {
  return (
    <div>
      <div
        className='cart-items'
        style={{
          height: "400px",
          width: "300px",
          border: "2px solid black",
          position: "fixed",
          right: "0",
          top: "5%",
          backgroundColor: "#ffffff"
        }}
      >
        {cart.length ? (
          <div className='posts'>
            {cart.map(cartItem => (
              <CartItem key={cartItem._id.toString()} item={cartItem} />
            ))}
          </div>
        ) : (
          <h1 style={{ color: "#000000" }}>No items found!</h1>
        )}
        <button
          className='btn btn-primary'
          style={{ position: "absolute", bottom: "0", left: "30%" }}
          onClick={e => {
            history.push("/checkout");
            toggleCart();
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

CartDropdown.propTypes = {};
const mapStateToProps = ({ cart: { cart } }) => ({
  cart
});

export default withRouter(
  connect(mapStateToProps, { toggleCart })(CartDropdown)
);
