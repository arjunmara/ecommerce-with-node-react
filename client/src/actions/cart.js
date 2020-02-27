import { ADD_TO_CART, CART_ERROR, GET_CART, TOGGLE_HIDDEN } from "./types";
import axios from "axios";
export const addToCart = item => async dispatch => {
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: item
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: error
    });
  }
};
export const getCart = () => async dispatch => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  try {
    dispatch({
      type: GET_CART,
      payload: cart
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR
    });
  }
};
export const toggleCart = () => async dispatch => {
  dispatch({
    type: TOGGLE_HIDDEN
  });
};
