import React, { Fragment } from "react";
import { connect } from "react-redux";

const CartItem = ({ item }) => {
  return (
    <Fragment>
      <div
        style={{
          color: "#000000"
        }}
      >
        {item.title}
      </div>
      <img
        src={item.productImg.replace(/\\/g, "/").replace(/public/g, "")}
        alt=''
      />
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
