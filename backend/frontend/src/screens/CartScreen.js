import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {

  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1 // GET qty from url after adding item, if location.search exists split (split turns into an array, takes away anything from that character and behind away, then in console the number is shown in the second place so we need to grab second array item which is [1])
  //console.log('qty:', qty)
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)   // Use the state to grab the items in the cart
  const { cartItems } = cart    // Destructuring the items in cart
  //console.log(cart) // Show what cart is grabbing

  // Send info to state when adding items to cart
  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))   // Dispatch to addTocart which is in our productActions, which will then add our items to the localStorage
    }
  },[dispatch, productId, qty])


  const removeFromCartHandler = (id) => {
    //console.log('remove:', id)
    dispatch(removeFromCart(id))  // Using removeFromCart from cartActions
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')  // Send to login page, if logged in redirect to shipping page
  }

    return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {/* If there are no items in cart display message */}
          {/* If there is an item/items destructure it key = item.product (product = id) */}
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />{" "}
                      {/* fluid makes it responsive */}
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    {/* Item stock selector */}
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}    // When value is changed we to dispatch to addToCart, and that value is whatever we change it to e.target.value, (change to number for subtotal function)
                      >
                        {[...Array(item.countInStock).keys()].map((
                          x // Created an array of how many products we have in stock
                        ) => (
                          <option key={x + 1} value={x + 1}>
                            {/* After mapping through we add a buyable stock for every stock we have in the db */}
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>

                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>

            {/* Cart Total calculator */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                {/* map through cartItems using reduce, take in two params accumalator, and the item.   0 is the number we want to start from */}
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                {/* Now get the total price, use .toFixed to set max amount of decimal places */}
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
            </ListGroup>

            {/* Checkout button */}
            <ListGroup.Item>
              <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>

            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    );
}

export default CartScreen
