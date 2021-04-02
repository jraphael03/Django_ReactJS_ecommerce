import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

function EditUserScreen({ match, history }) {
  
    const userId = match.params.id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails); // Grabbing userRegister from the state, (found in store.js)
    const { error, loading, user } = userDetails; // Inside of userReducer we want to pull back the selected objects

    // If user is logged in don't let them go to login screen redirect instead
    useEffect(() => {                   // Change to number to match other id or else it will create infinite loop
        if(!user.name || user._id !== Number(userId)){     // if user.name or user.id does not match userId(passed in from match) dispatch update
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();

    };

    return (
      <div>
        <Link to="/admin/userlist">Go Back</Link>

        <FormContainer>

          <h1>Edit User</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="isadmin">
                <Form.Label>Is Admin</Form.Label>
                <Form.Check
                  type="checkbox"
                  placeholder="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)} // Not value checked for checkbox
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}

        </FormContainer>
      </div>
    );
    }

export default EditUserScreen;
