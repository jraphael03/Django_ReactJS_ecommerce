import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import axios from 'axios' 

import Rating from '../components/Rating'

function ProductScreen({ match }) {     // Pass in match so we don't have to pass in props

  const [product, setProduct] = useState([])

  useEffect(() => {     // Explanation of this function in HomeScreen
    async function fetchProduct(){
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()

  }, [])

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>

        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">       {/* flush takes away border */}
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
            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>

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
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              {/* In Stock Status */}
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>

              {/* Button for Add to Cart */}
              <ListGroupItem>
                <Button className="btn-block" disabled={product.countInStock === 0} type="button">
                  Add to Cart
                </Button>
              </ListGroupItem>

            </ListGroup>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

export default ProductScreen




// Used with products.js while developing frontend
// const product = products.find((p) => p._id === match.params.id); // P finds and matches id then pulls the parameters of the id from products array