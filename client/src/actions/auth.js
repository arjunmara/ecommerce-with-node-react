import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Register a user
export const register = ({
  name,
  email,
  password,
  uType
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password, uType });

  try {
    const res = await axios.post("api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
// login a user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// LOGOUT

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

// Delete account and profile

export const deleteAccount = id => async dispatch => {
  // if (window.confirm("Are you sure? This can not be undone!")) {
  //   try {
  //     await axios.delete(`/api/profile`);
  //     dispatch({
  //       type: DELETE_ACCOUNT
  //     });
  //     dispatch(setAlert("Your account has been permanently deleted"));
  //   } catch (error) {
  //     dispatch({
  //       type: PROFILE_ERROR,
  //       payload: {
  //         msg: error.response.statusText,
  //         status: error.response.status
  //       }
  //     });
  //   }
  // }
};
