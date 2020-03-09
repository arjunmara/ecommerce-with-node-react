import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import alert from "./alerts";
import auth from "./auth";
import post from "./post";
import product from "./product";
import cart from "./cart";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"]
};
const rootReducer = combineReducers({
  alert,
  auth,
  post,
  product,
  cart
});
export default persistReducer(persistConfig, rootReducer);
