// Reducer is a function that takes in the current state, and will take in an action of what we want to do to the state
// take in state and create an action that will return a new copy into the store

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
  PRODUCT_CREATE_RESET,

  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";


export const productListReducer = (state = { products: [] }, action) => {
  // state is an empty array of products
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }; // While loading product array is still empty

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }; // When finished loading, products is whatever data action was able to find

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    default:
      return state;             // If none of the above happen return back original state
  }
};


export const productDetailsReducer = (state = { product: { reviews:[] } }, action) => {
  // state is an empty array of products
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }; // While loading product array spread state

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }; // When finished loading, product is whatever data action was able to find

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    default:
      return state; // If none of the above happen return back original state
  }
};


export const productDeleteReducer = ( state = { }, action ) => {
  // state is an empty array of products
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }; // While loading product array spread state

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }; 

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    default:
      return state; // If none of the above happen return back original state
  }
};



export const productCreateReducer = (state = {}, action) => {
  // state is an empty array of products
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }; // While loading product array spread state

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };  // send product that was created

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case PRODUCT_CREATE_RESET:
      return { }

    default:
      return state; // If none of the above happen return back original state
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  // state is an empty array of products
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }; // While loading product array spread state

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }; // send product that was created

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }; // when finished if nothing was found give an error

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state; // If none of the above happen return back original state
  }
};

