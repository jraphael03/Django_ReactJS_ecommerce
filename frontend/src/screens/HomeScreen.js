import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function fetchProducts(){     // instead of .then(promise) we will use async(promise) await promise
          const { data } = await axios.get(     // GRAB AND DESTRUCTURE DATA
            "/api/products/"        // Load without using http://127.0.0.1:8000 go into package.json and add below name: "proxy": "http://127.0.0.1:8000",
          );                    
          setProducts(data);    // Set data
        }

        fetchProducts()

    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>                           {/* Products are being displayed from Product.js component */}
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
