import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map(alertOne => (
    <div key={alertOne.id} className={`alert alert-${alertOne.alertType}`}>
      {alertOne.msg}
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
