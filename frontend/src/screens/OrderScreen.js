import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from 'react-paypal-button-v2'
import Message from "../components/Message";
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen({ match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails); // Grab orderCreate from state and destructure actions
  const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay); // Grab orderCreate from state and destructure actions
    const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    // only loaded if we have it
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  // clientId payPal
  // AcBG3ZtzTgvR-nEIRCzjHqFsn-hvD34mSsuO8R-IBHLGuQfS2fCBafdAc62WXjqKL_3UkozqzrQKrJoS

  // Create HTML function to use smart paypal buttons
  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type ='text/javascript'
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AcBG3ZtzTgvR-nEIRCzjHqFsn-hvD34mSsuO8R-IBHLGuQfS2fCBafdAc62WXjqKL_3UkozqzrQKrJoS";
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)   // Append the script above to the body when it is don
  }

  // On success after order send to users account to view the order
  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {    // _id is how id is set in the backend
      dispatch({ type: ORDER_PAY_RESET });
      
      dispatch(getOrderDetails(orderId));
    }else if(!order.isPaid){
      if(!window.paypal){   // if window doesn't have paypal display script
        addPayPalScript()
      }else{
        setSdkReady(true)   // if it does set to true
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))    // payOrder sends API call and update DB
  }

  // If loading show loader, if error display message error, if neither display order page
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      {/* one row two col layout */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Name: </strong>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>{" "}
                {/* a href link will pull up email */}
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.state},{"  "}
                {order.shippingAddress.country},
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          {/* Product is the id */}
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {/* If order is not paid ouput button, if it is disable */}
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}

                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
