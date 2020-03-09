import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearCartItem, addToCart, removeItem } from "../../actions/cart";

const CheckoutItem = ({ cartItem, clearCartItem, addToCart, removeItem }) => {
  const { title, prouductPrice, count, productImg } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img
          src={productImg.replace(/\\/g, "/").replace(/public/g, "")}
          alt='item'
        />
      </div>
      <span className='name'>{title}</span>
      <span className='quantity'>
        <div className='arrow' onClick={e => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className='value'>{count}</span>
        <div className='arrow' onClick={e => addToCart(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className='price'>{prouductPrice}</span>
      <div className='remove-button' onClick={e => clearCartItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

CheckoutItem.propTypes = {
  clearCartItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  cartItem: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default connect(null, { clearCartItem, addToCart, removeItem })(
  CheckoutItem
);
