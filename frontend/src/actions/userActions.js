import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
// USER LOGIIN
// we are going to take email and password,   
export const login = (email, password) => async (dispatch) => {
    try{
        // set USER_LOGIN_REQUEST,
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'content-type' : 'application/json'
            }
        }

        // make the post request,
        const { data } = await axios.post(      // Want to destructure data right away
          "/api/users/login/",
          { 'username': email, 'password': password },
          config
        );      

        // and if it is successful dispatch payload to the reducer
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // Set in state and localStorage, (store.js)
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.detail // If we received an error message
                ? error.response.data.detail // Give the error message, from detail which is from the backend
                : error.message, // If not display generic message
        });
    }
}




// USER LOGOUT
// In reducer we have USER_LOGOUT SET TO AN EMPTY OBJECT SO THE STATE WILL ALSO BE CLEARED
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')     // Remove item from localStorage so we can logout
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
}



// USER REGISTER
export const register = (name, email, password) => async (dispatch) => {
  try {
    // set USER_REGISTER_REQUEST,
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    // make the post request,
    const { data } = await axios.post(
      // Want to destructure data right away
      "/api/users/register/",
      { 'name': name, 'email': email, 'password': password },   // Change username to email, because email is our username
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

      // If register is successful we want to login immediately
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

    // Set in state and localStorage, (store.js)
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};


// USER PROFILE
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    // set USER_DETAILS_REQUEST,
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },    //We want to get data about the profile we are logged in as, userInfo is the state
    } = getState()

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // Pass in the token from logged in user for authorization access
      },
    };

    // make the get request,
    const { data } = await axios.get(
      // Want to destructure data right away
      `/api/users/${id}/`,
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    // Set in state and localStorage, (store.js)
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};


// USER UPDATE
export const updateUserProfile = ( user ) => async (dispatch, getState) => {    // Take in user object that will gather the data and send the data to update profile
  try {
    // set USER_UPDATE_PROFILE_REQUEST,
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },    //We want to get data about the profile we are logged in as, userInfo is the state
    } = getState()

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // Pass in the token from logged in user for authorization access
      },
    };

    // make the put request,
    const { data } = await axios.put(
      // Want to destructure data right away
      `/api/users/profile/update/`,
      user,     // Added the user parameter from the top
      config
    );

    // and if it is successful dispatch payload to the reducer
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // After dipatching the update information we want to login again with the new information
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Update state and localStorge with the new userInfo
    localStorage.setItem("userInfo", JSON.stringify(data));

    // Set in state and localStorage, (store.js)
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail // If we received an error message
          ? error.response.data.detail // Give the error message, from detail which is from the backend
          : error.message, // If not display generic message
    });
  }
};



