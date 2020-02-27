import { combineReducers } from "redux";
import alert from "./alerts";
import auth from "./auth";
import post from "./post";
import product from "./product";
import cart from "./cart";
export default combineReducers({
  alert,
  auth,
  post,
  product,
  cart
});
