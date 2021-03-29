import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen({ match, history }) {     // Pass in match so we don't have to pass in props

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {     // Explanation of this function in HomeScreen
    dispatch(listProductDetails(match.params.id))   // Getting id from productActions now

  }, [dispatch, match])

  
  const addToCartHandler = () => {
    //console.log('Button Clicked', match.params.id)
    history.push(`/cart/${match.params.id} ? qty=${qty}`)
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              {" "}
              {/* flush takes away border */}
              {/* Product Name */}
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              {/* Rating */}
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              {/* Price */}
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              {/* Description */}
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                {/* Price */}
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* In Stock Status */}
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 &&(
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs='auto' className='my-1'>
                        <Form.Control
                        as='select'
                        val={qty}
                        onChange={(e) => setQty(e.target.value)}
                        >
                          {
                            [...Array(product.countInStock).keys()].map((x) => (      // Created an array of how many products we have in stock
                              <option key={x+1} value={x+1}>    {/* After mapping through we add a buyable stock for every stock we have in the db */}
                                {x + 1}
                              </option>
                            ))   
                          }

                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {/* Button for Add to Cart */}
                <ListGroup.Item>
                  <Button
                  onClick={addToCartHandler}
                    className="btn-block"
                    disabled={product.countInStock === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen




// Used with products.js while developing frontend
// const product = products.find((p) => p._id === match.params.id); // P finds and matches id then pulls the parameters of the id from products array