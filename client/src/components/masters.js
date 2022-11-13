import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import MasterList from './masterList';
import { useLocation } from 'react-router-dom';

const Masters = () => {
  const { state } = useLocation();
  console.log(state)
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
      list: state.list,
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
                        }}> 
          <MasterList 
            masters = { formik.values.list }
          />
        </div>
        <button type="submit" disabled={ !formik.values.masterId ? true : false}>Submit request</button>
      </ form>
    </ section>)
 };
 
export default Masters;
