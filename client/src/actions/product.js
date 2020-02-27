import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  PRODUCT_ERROR
} from "./types";

// Get Products
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete Product
// export const deletePost = id => async dispatch => {
//   try {
//     await axios.delete(`/api/posts/${id}`);
//     dispatch({
//       type: DELETE_POST,
//       payload: id
//     });

//     dispatch(setAlert("Post Removed", "success"));
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: error.response.statusText, status: error.response.status }
//     });
//   }
// };

// Add Product
export const addProduct = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  try {
    const res = await axios.post("/api/products/", formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });

    dispatch(setAlert("Product Added", "success"));
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get Post
export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
