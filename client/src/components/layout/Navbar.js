import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { toggleCart } from "../../actions/cart";
import CartDropdown from "../cart/CartDropdown";
const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  cart: { cart, hidden },
  toggleCart
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/products'>Products</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          {" "}
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/products'>Products</Link>
      </li>
      <li>
        {" "}
        <i
          className='fas fa-cart-plus'
          onClick={e => {
            toggleCart();
          }}
        ></i>
        <span>0</span>
      </li>
      {!hidden && <CartDropdown />}
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Chefline
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  auth: state.auth,
  user: state.auth.user,
  cart: state.cart
});

export default connect(mapStateToProps, { logout, toggleCart })(Navbar);
