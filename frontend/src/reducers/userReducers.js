import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";


export const userLoginReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; 

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // When finished loading, userInfo is whatever data action was able to find

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case USER_LOGOUT:
        return {}       // Return empty state

    default:
      return state; // If none of the above happen return back original state
  }
};



