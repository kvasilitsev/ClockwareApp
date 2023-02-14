import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import MasterList from './MasterList';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RadioGroup from '@mui/material/RadioGroup';

const Masters = () => {
  const { state } = useLocation();  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {      
      masterName: '',
      masterId: '',
      name: state.name,
      email: state.email,
      cityId: state.cityId,
      clockId: state.clockId,
      bookingTime: state.bookingTime,      
      city: state.city,
      clockSize: state.clockSize  
    }, 
   
    onSubmit:  () => navigate('/orderReview', {state: formik.values})    
  });
    return (  
    <section>
      <h2>Select master</h2>
      <Form onSubmit={formik.handleSubmit}>         
        <div onChange={value => {
                        formik.setFieldValue('masterId', value.target.id);
                        formik.setFieldValue('masterName', value.target.value);
                        formik.setFieldValue('nextState', 'review');                        
                        }}>
        <RadioGroup>
          <MasterList 
            masters = { state.list }
          />
        </RadioGroup>               
        </div>
        <Button type="submit" variant="secondary" disabled={  !(formik.isValid && formik.dirty) ? true : false}>Submit</Button>
      </ Form>
    </ section>)
 };
 
export default Masters;
