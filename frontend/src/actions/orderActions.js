import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,

  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'



export const createOrder = (order) => async (dispatch, getState) => {
  // Take in order object that will gather the data and send the data to db
  try {
    // set ORDER_CREATE_REQUEST,
    dispatch({
      type: ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(
      // Want to destructure data right away
      `/api/orders/add/`,
      order, // Added the order parameter from the top
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({      // Clears cart state after successful order
        type: CART_CLEAR_ITEMS,
        payload: data,
    });

    localStorage.removeItem('cartItems')    // Clears cartItems from localStorage after successful order


  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};





export const getOrderDetails = (id) => async (dispatch, getState) => {
  // Take in order object that will gather the data and send the data to db
  try {
    // set ORDER_CREATE_REQUEST,
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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
    const { data } = await axios.get(
      // Want to destructure data right away
      `/api/orders/${id}/`,
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};



export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  // Take in order object that will gather the data and send the data to db
  try {
    // set ORDER_CREATE_REQUEST,
    dispatch({
      type: ORDER_PAY_REQUEST,
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
    const { data } = await axios.put(
      // Want to destructure data right away
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};