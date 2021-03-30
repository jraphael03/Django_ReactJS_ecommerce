import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

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
          "/api/users/login/"
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

