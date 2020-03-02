import React from "react";
import PropTypes from "prop-types";

const CheckoutItem = ({ cartItem: { title, prouductPrice, count } }) => {
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src='' alt='item' />
      </div>
      <span className='name'>{title}</span>
      <span className='quantity'>{count}</span>
      <span className='price'>{prouductPrice}</span>
      <div className='remove-button'>&#10005;</div>
    </div>
  );
};

CheckoutItem.propTypes = {};

export default CheckoutItem;
