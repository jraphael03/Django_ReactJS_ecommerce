import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()  // Gives access to history prop

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}`)    // set keyword to keyword
        }else{
            history.push(history.push(history.location.pathname))   // If search bar is empty send to current page
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button 
                type='submit'
                variant="outline-success"
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
