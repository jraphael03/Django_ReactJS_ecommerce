import React from 'react'
import { Alert } from 'react-bootstrap' 

function Message({ variant, children }) {       // Can be used to set different error messages in other files just by using Ex: <Message variant="">{error}</Message>
  return ( 
  <Alert variant={variant}>
      {children}
  </Alert>
)}

export default Message
