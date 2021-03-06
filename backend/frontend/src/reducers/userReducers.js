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

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
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



// USER LIST ADMIN   
export const userListReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }; 

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case USER_LIST_RESET:   // resets state
      return {users: []}

    default:
      return state; // If none of the above happen return back original state
  }
};



// DELETE USER FROM DB AS ADMIN
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }; // success message if it works 

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    default:
      return state; // If none of the above happen return back original state
  }
};


// UPDATE USER FROM DB AS ADMIN
export const userUpdateReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }; // success message if it works

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case USER_UPDATE_RESET:
      return { user: {} }   // reset user state

    default:
      return state; // If none of the above happen return back original state
  }
};