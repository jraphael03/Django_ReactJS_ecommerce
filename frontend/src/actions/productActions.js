import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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
          payload: error.response && error.response.data.message    // If we received an error message
          ? error.response.data.message     // Give the error message
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
        error.response && error.response.data.message // If we received an error message
          ? error.response.data.message // Give the error message
          : error.message, // If not display generic message
    });
  }
};
