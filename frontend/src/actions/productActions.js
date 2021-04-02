import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

// Instead of making Products API call from HomeScreen we will do it in this file

// GET PRODUCTS (HomeScreen.js)
export const listProducts = () => async (dispatch) => {    // dispatch action to reducers, then update state
    try{
      dispatch({ type: PRODUCT_LIST_REQUEST })

      // MAKE API CALL
      const { data } = await axios.get("/api/products/")     // GRAB AND DESTRUCTURE DATA

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data       // data we return from the API call
      })
        

    } catch(error){
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.detail    // If we received an error message
          ? error.response.data.detail     // Give the error message, from detail which is from the backend
          : error.message,                  // If not display generic message
        })

    }
}


// GET PRODUCT BY ID    (ProductScreen.js)
export const listProductDetails = (id) => async (dispatch) => {
  // dispatch action to reducers, then update state
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // MAKE API CALL
    const { data } = await axios.get(`/api/products/${id}`); // GRAB AND DESTRUCTURE DATA

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data, // data we return from the API call
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message
          : error.message, // If not display generic message
    });
  }
};

// DELETE PRODUCT FROM DB AS ADMIN
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo }, //We want to get data about the profile we are logged in as, userInfo is the state
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Pass in the token from logged in user for authorization access
      },
    };

    // make the put request,
    const { data } = await axios.delete(
      // Want to destructure data right away
      `/api/products/delete/${id}/`,
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};