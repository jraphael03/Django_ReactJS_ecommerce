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

// USER LOGIN 
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


// USER REGISTER 
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; // When finished loading, userInfo is whatever data action was able to find

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case USER_LOGOUT:
      return {}; // Return empty state

    default:
      return state; // If none of the above happen return back original state
  }
};


// USER PROFILE    
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }; // When finished loading, userInfo is whatever data action was able to find

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

      case USER_DETAILS_RESET:    // Clears out profile data when logged out
        return { user: {} }

    default:
      return state; // If none of the above happen return back original state
  }
};


// USER UPDATE    
export const userUpdateProfileReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }; // success true with give a message that profile updated

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case USER_UPDATE_PROFILE_RESET:   // resets state
      return {}

    default:
      return state; // If none of the above happen return back original state
  }
};


