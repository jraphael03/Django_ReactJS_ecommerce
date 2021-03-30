import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from '../actions/userActions'

function LoginScreen({ location, history }) {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : "/"   // Separate redirect by the = symbol and grab whatever is after

    const userLogin = useSelector(state => state.userLogin)     // Grabbing userLogin from the state, (found in store.js)
    const { error, loading, userInfo } = userLogin    // Inside of userReducer we want to pull back the selected objects

    // If user is logged in don't let them go to login screen redirect instead
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log('submitted')
        dispatch(login(email, password))        // Will dispatch to userActions

    }

    return (
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

            <Button type="submit" variant="primary">
                Sign In
            </Button>

        </Form>

        <Row className="py-3">
            <Col>
                New Customer? <Link 
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>       {/*If we have redirect send user to register page, else send user to register page with no extra params*/}
                    Register
                    </Link>
            </Col>

        </Row>

      </FormContainer>
    );
}

export default LoginScreen
