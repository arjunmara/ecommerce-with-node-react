import React from "react";
import PropTypes from "prop-types";

const ProductSingle = props => {
  const productObj = props.location.state;
  const { product } = productObj;
  const { title, description, prouductPrice, quantity } = product;
  return <div>{title}</div>;
};

ProductSingle.propTypes = {};

export default ProductSingle;
