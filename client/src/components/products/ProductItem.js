import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";

const ProductItem = ({ auth, product, addToCart, cart, match }) => {
  const url = product.title.replace(/\s+/g, "-").toLowerCase();
  const imgUrl = product.productImg.replace(/\\/g, "/").replace(/public/g, "");
  console.log(imgUrl);
  return product.quantity > 0 ? (
    <div className='post bg-white p-1 my-1'>
      <Link
        to={{
          pathname: `${match.path}/${url}`,
          state: { product }
        }}
      >
        <p className='my-1'>{product.title}</p>
      </Link>
      <img src={imgUrl} alt='alternate image' />
      <p className='post-date'>
        <span>Rs. </span> {product.prouductPrice}
      </p>
      <p>{product.description}</p>
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
      <img src={imgUrl} alt='image' />
      <p className='my-1'>{product.title}</p>
      <p className='post-date'>
        <span>Rs. </span> {product.prouductPrice}
      </p>
      <p>{product.description}</p>
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
