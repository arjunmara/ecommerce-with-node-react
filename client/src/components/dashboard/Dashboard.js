import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { deleteAccount } from "../../actions/auth";
const Dashboard = ({ deleteAccount, auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome {user && user.name}
      </p>
      <Fragment>
        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus'></i>Delete My Account
          </button>
        </div>
      </Fragment>
      <Fragment>
        <p>You have not yet setup a profile, Please add some info.</p>
        <Link to='/products' className='btn btn-primary my-1'>
          Add Products
        </Link>
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deleteAccount })(Dashboard);
