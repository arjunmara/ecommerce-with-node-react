import {
  ADD_TO_CART,
  CART_ERROR,
  GET_CART,
  TOGGLE_HIDDEN,
  CLEAR_CART_ITEM,
  REMOVE_ITEM
} from "./types";
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
export const clearCartItem = item => async dispatch => {
  dispatch({
    type: CLEAR_CART_ITEM,
    payload: item
  });
};
export const removeItem = item => async dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: item
  });
};
