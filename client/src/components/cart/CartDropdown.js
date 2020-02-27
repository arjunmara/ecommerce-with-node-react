import React from "react";
import PropTypes from "prop-types";

const CartDropdown = props => {
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

export default CartDropdown;
