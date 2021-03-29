import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {       // function inside of function made it async, getState let's us get any part of the state
    // Grab the data of the item we selected by it's id
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {                      // We can grab all of these items from the data we grabbed
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    // use to keep info saved 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))        // Grabbing cart from store.js, cart also has cartItems
    

}

