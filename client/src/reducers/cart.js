import {
  ADD_TO_CART,
  CART_ERROR,
  GET_CART,
  TOGGLE_HIDDEN,
  CLEAR_CART_ITEM,
  REMOVE_ITEM
} from "../actions/types";
import { addItemsToCart, removeItemFromCart } from "../actions/Cart.utils";

const initialState = {
  hidden: true,
  cart: [],
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      // localStorage.setItem("cart", JSON.stringify(...state.cart));
      return {
        ...state,
        cart: addItemsToCart(state.cart, payload),
        loading: false
      };
    case GET_CART:
      return {
        ...state,
        cart: [...state.cart.concat(payload)],
        loading: false
      };
    case CART_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem._id !== payload._id),
        loading: false
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cart: removeItemFromCart(state.cart, payload),
        loading: false
      };
    case TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    default:
      return state;
  }
}
