import {
  ADD_TO_CART,
  CART_ERROR,
  GET_CART,
  TOGGLE_HIDDEN
} from "../actions/types";

const initialState = {
  hidden: true,
  cart: [],
  cartItem: null,
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      localStorage.setItem("cart", JSON.stringify([...state.cart, payload]));
      return {
        ...state,
        cart: [...state.cart, payload],
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
    case TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    default:
      return state;
  }
}
