import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer, // Adding a reducer in here triggers state
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

// Pull the items we sent to localStorage (cartActions.js) to add to state
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []   // If items exist grab and parse them, or if items don't exist empty array

// Pull the items we sent to localStorage (userActions.js) to add to state
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null   // If user exist grab and parse them, or if the user don't exist set to null

// Pull the items we sent to localStorage (userActions.js) to add to state
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}   // If shippingAddress exist grab and parse them, or if the addresss don't exist set to empty


// Adding to our state
const initialState = {
  cart: { cartItems: cartItemsFromStorage, 
  shippingAddress: shippingAddressFromStorage,    // Placed in cart because it was created in cart reducers
  },
  userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
