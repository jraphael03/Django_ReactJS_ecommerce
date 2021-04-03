import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from "../components/ProductCarousel";
import { useDispatch, useSelector } from 'react-redux'      // useSelector allows you to use certain parts of your state
import { listProducts } from '../actions/productActions'

function HomeScreen({ history }) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList;  // Destructure the productList which is found by going to store first, then follow into productReducers
 
    let keyword = history.location.search // Add keyword to useEffect to refresh screen when called
    //console.log(keyword)
    useEffect(() => {
        dispatch(listProducts(keyword));
        
    }, [dispatch, keyword])


    return (
      <div>
        {/* If we are not searching display carousel */}
        {!keyword && <ProductCarousel />}
        <h1>Latest Products</h1>

        {loading ? ( // If loading render loading, if error display reducer error msg, if finished render products
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        )}
      </div>
    );
}

export default HomeScreen





// USED INSIDE OF USE EFFECT TO PULL PRODUCTS FROM BACKEND BEFORE ADDING REDUX STORE,

//const [products, setProducts] = useState([]);

// async function fetchProducts() {
//     // instead of .then(promise) we will use async(promise) await promise
//     const { data } = await axios.get(
//     // GRAB AND DESTRUCTURE DATA
//     "/api/products/" // Load without using http://127.0.0.1:8000 go into package.json and add below name: "proxy": "http://127.0.0.1:8000",
//     );
//     setProducts(data); // Set data
// }

// fetchProducts();
