import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../actions/product";
import { getCart } from "../../actions/cart";
import Spinner from "../layout/Spinner";
import { useEffect } from "react";
import ProductItem from "./ProductItem";

const Products = ({
  auth,
  getProducts,
  getCart,
  product: { products, loading, hidden },
  match
}) => {
  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts, getCart]);

  return loading ? (
    <Fragment>
      <Spinner />
    </Fragment>
  ) : (
    <Fragment>
      {auth.isAuthenticated === true && (
        <Link to='/product-add'>
          <button className='btn btn-primary'>Add a Product</button>
        </Link>
      )}
      <div className='posts'>
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            auth={auth}
            match={match}
          />
        ))}
      </div>
      {auth.isAuthenticated === false && (
        <button className='btn btn-danger'>
          <Link to='/checkout'>Go to Cart</Link>
        </button>
      )}
    </Fragment>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth
});
export default connect(mapStateToProps, { getProducts, getCart })(Products);
