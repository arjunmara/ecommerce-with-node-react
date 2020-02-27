import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";

const ProductItem = ({ auth, product, addToCart, cart }) => {
  let [count, setCount] = useState(0);

  return product.quantity > 0 ? (
    <div className='post bg-white p-1 my-1'>
      <p className='my-1'>{product.title}</p>
      <p className='post-date'>
        <span>Rs. </span> {product.prouductPrice}
      </p>
      <p>{product.description}</p>

      <img
        src={`data:image/png;base64, ${product.productImg.data}`}
        alt='alternate'
      />
      {!auth.isAuthenticated && (
        <button
          className='btn btn-primary'
          onClick={e => {
            // if (cart.cart.find(id => (id = "5e4e33b680367b2ae4e2a684"))) {
            addToCart(product);
          }}
        >
          Add To Cart
        </button>
      )}
    </div>
  ) : (
    <div className='post bg-white p-1 my-1'>
      <p className='my-1'>{product.title}</p>
      <p className='post-date'>
        <span>Rs. </span> {product.prouductPrice}
      </p>
      <p>{product.description}</p>

      <img
        src={`data:image/png;base64, ${product.productImg.data}`}
        alt='alternate'
      />
      <p>Out Of Stock</p>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth
});
export default connect(mapStateToProps, { addToCart })(ProductItem);
