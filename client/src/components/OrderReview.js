import React from 'react';
import { useLocation } from 'react-router-dom';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";
import UTCConverter from '../utils/UTCDateConvert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const OrderReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    sessionStorage.removeItem('values');           
    try {       
      const modifyTime = UTCConverter(state.bookingTime); //show time zone in UTC       
      const apiRequest = new Request({name: state.name, clockId: state.clockId, cityId: state.cityId, bookingTime: modifyTime, email: state.email, masterId: state.masterId});  //for production when server in UTC timezone        
      const res = await apiRequest.createOrder();
      if (res.data === true){          
        const apiRequest = new Request({email: state.email})
        await apiRequest.sendEmail();                  
        navigate('/success');
      }       
    } catch (e) {
        console.log('error: ', e.response);          
      }           
  };
  const handleReset = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('values');
    navigate('/');
  }
  return (  
    <section className='review'>
      <h2>Order review</h2>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <div className='order-review'>
          <div>
            <h6>Name</h6>
            <h5>{state.name}</h5>
          </div>
          <div>
            <h6>Email</h6>
            <h5>{state.email}</h5>
          </div>
          <div>
            <h6>Clock size</h6>
            <h5>{state.clockSize}</h5>
          </div>
          <div>
            <h6>City</h6>
            <h5>{state.city}</h5>
          </div>
          <div>
            <h6>Booking date and time</h6>
            <h5>{state.bookingTime.toLocaleString()}</h5>
          </div>
          <div>
            <h6>Master</h6>
            <h5>{state.masterName}</h5>
          </div>                       
        </div>
        <div className='order-review-button d-grid gap-2'>
          <Button type='submit' variant='secondary'>Create order</Button>
          <Button type='reset' variant='secondary'>Reset</Button>          
        </div>
        
      </ Form>
    </ section>)
 };
 
export default OrderReview;

