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

  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,

  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,

  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

// Instead of making Products API call from HomeScreen we will do it in this file

// GET PRODUCTS (HomeScreen.js)   keyword for SearchBox
export const listProducts = (keyword = '') => async (dispatch) => {    // dispatch action to reducers, then update state
    try{
      dispatch({ type: PRODUCT_LIST_REQUEST })

      // MAKE API CALL
      const { data } = await axios.get(`/api/products${keyword}`)     // GRAB AND DESTRUCTURE DATA, if using SearchBox append keyword to the end

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

    // make the delete request,
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



// CREATE PRODUCT FROM DB AS ADMIN
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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

    // make the post request,
    const { data } = await axios.post(
      // Want to destructure data right away
      `/api/products/create/`,
      {},     // Send an empty object to create in backend
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};


// UPDATE PRODUCT FROM DB AS ADMIN
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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

    // make the post request,
    const { data } = await axios.put(
      // Want to destructure data right away
      `/api/products/update/${product._id}/`,
      product,     // Send an product to backend
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    // update product details after success
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS, 
      payload:data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};



// CREATE PRODUCT REVIEW
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
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

    // make the post request,
    const { data } = await axios.post(
      // Want to destructure data right away
      `/api/products/${productId}/reviews/`,
      review,     // Send review to backend
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};


// GET TOP PRODUCST
export const listTopProducts = () => async (dispatch) => {    // dispatch action to reducers, then update state
    try{
      dispatch({ type: PRODUCT_TOP_REQUEST })

      // MAKE API CALL
      const { data } = await axios.get(`/api/products/top/`)     // GRAB AND DESTRUCTURE DATA, if using SearchBox append keyword to the end

      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data       // data we return from the API call
      })
        

    } catch(error){
        dispatch({
          type: PRODUCT_TOP_FAIL,
          payload: error.response && error.response.data.detail    // If we received an error message
          ? error.response.data.detail     // Give the error message, from detail which is from the backend
          : error.message,                  // If not display generic message
        })

    }
}