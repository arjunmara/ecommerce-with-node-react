import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { connect } from "react-redux";

const CartDropdown = ({ cart }) => {
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
        {cart.map(cartItem => (
          <CartItem key={cartItem._id.toString()} item={cartItem} />
        ))}
        <button
          className='btn btn-primary'
          style={{ position: "absolute", bottom: "0", left: "30%" }}
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

export default connect(mapStateToProps, {})(CartDropdown);
