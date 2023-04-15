import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Success = () => {
  return (
    <div className='success'>     
      <p>Thank you for your order. You will shortly receive an order confirmation email.</p>
      <Button variant='secondary' as={Link} to="/">Book another repair</Button>
    </div>
  );
}

export default Success;


