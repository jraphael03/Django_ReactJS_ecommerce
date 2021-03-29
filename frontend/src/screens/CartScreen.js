import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { productDetailsReducer } from '../reducers/productReducers'

function CartScreen({ match, location, history }) {

  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1 // GET qty from url after adding item, if location.search exists split (split turns into an array, takes away anything from that character and behind away, then in console the number is shown in the second place so we need to grab second array item which is [1])
  //console.log('qty:', qty)
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)   // Use the state to grab the items in the cart
  const { cartItems } = cart    // Destructuring the items in cart
  console.log(cart)

  // Send info to state when adding items to cart
  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))   // Dispatch to addTocart which is in our productActions, which will then add our items to the localStorage
    }
  },[dispatch, productId, qty])


    return (
        <div>
          Cart  
        </div>
    )
}

export default CartScreen
