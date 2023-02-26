import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";
import UTCConverter from '../utils/UTCDateConvert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const OrderReview = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {      
      masterName: state.masterName,
      masterId: state.masterId,
      name: state.name,
      email: state.email,
      cityId: state.cityId,
      clockId: state.clockId,
      bookingTime: state.bookingTime,     
      city: state.city,
      clockSize: state.clockSize 
    },    
    onSubmit: async (values) => {         
      try {        
        const modifyTime = UTCConverter(values.bookingTime); //show time zone in UTC       
        const apiRequest = new Request({name: values.name, clockId: values.clockId, cityId: values.cityId, bookingTime: modifyTime, email: values.email, masterId: values.masterId});  //for production when server in UTC timezone
        //const apiRequest = new Request({name: values.name, clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime, email: values.email, masterId: values.masterId}); //for dev
        const res = await apiRequest.createOrder();
        if (res.data === true){          
          const apiRequest = new Request({email: values.email})
          await apiRequest.sendEmail();                      
          navigate('/success');
        }             
      } catch (e) {
          console.log('error: ', e.response);          
        }   
      },    
    onReset: () => navigate('/')
  });
    return (  
    <section className='review'>
      <h2>Order review</h2>
      <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className='order-review'>
          <div>
            <h6>Name</h6>
            <h5>{formik.values.name}</h5>
          </div>
          <div>
            <h6>Email</h6>
            <h5>{formik.values.email}</h5>
          </div>
          <div>
            <h6>Clock size</h6>
            <h5>{formik.values.clockSize}</h5>
          </div>
          <div>
            <h6>City</h6>
            <h5>{formik.values.city}</h5>
          </div>
          <div>
            <h6>Booking date and time</h6>
            <h5>{formik.values.bookingTime.toLocaleString()}</h5>
          </div>
          <div>
            <h6>Master</h6>
            <h5>{formik.values.masterName}</h5>
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
