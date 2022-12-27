import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import MasterList from './master-list';
import { useLocation } from 'react-router-dom';

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
      <h1>Select master</h1>
      <form onSubmit={formik.handleSubmit}> 
        <div onChange={value => {
                        formik.setFieldValue('masterId', value.target.id);
                        formik.setFieldValue('masterName', value.target.value);
                        formik.setFieldValue('nextState', 'review');                        
                        }}> 
          <MasterList 
            masters = { state.list }
          />
        </div>
        <button type="submit" disabled={  !(formik.isValid && formik.dirty) ? true : false}>Submit</button>
      </ form>
    </ section>)
 };
 
export default Masters;
