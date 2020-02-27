import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CartItem = ({ item }) => {
  console.log(item);

  return (
    <Fragment>
      <div
        style={{
          color: "#000000"
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          color: "#000000"
        }}
      >
        {item.count} <span> x {item.prouductPrice}</span>
      </div>
    </Fragment>
  );
};

CartItem.propTypes = {};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, {})(CartItem);
