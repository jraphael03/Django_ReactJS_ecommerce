import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {

        const [name, setName] = useState("");

        const [email, setEmail] = useState("");

        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        const [message, setMessage] = useState("");

        const dispatch = useDispatch();

        const redirect = location.search ? location.search.split("=")[1] : "/"; // Separate redirect by the = symbol and grab whatever is after

        const userRegister = useSelector((state) => state.userLogin); // Grabbing userRegister from the state, (found in store.js)
        const { error, loading, userInfo } = userRegister; // Inside of userReducer we want to pull back the selected objects

        // If user is logged in don't let them go to login screen redirect instead
        useEffect(() => {
          if (userInfo) {
            history.push(redirect);
          }
        }, [history, userInfo, redirect]);

        const submitHandler = (e) => {
          e.preventDefault();
          // Warning prompt, if two password do not match, set custom message, if they do match dispatch
          if (password !== confirmPassword) {
            setMessage("Passwords do not match");
          } else {
            dispatch(register(name, email, password)); // Will dispatch to userActions
          }
        };

    return (
      <FormContainer>
        <h1>Sign In</h1>
        {message && <Message variant="danger">{message}</Message>}  {/* Message for passwords not matching */}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              {/*If we have redirect send user to login page, else send user to login page with no extra params*/}
              Sign In
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
}

export default RegisterScreen;
