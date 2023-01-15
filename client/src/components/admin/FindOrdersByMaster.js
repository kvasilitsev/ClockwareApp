import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { MASTER_ID_REGEXP } from '../../models/regExp';

const validate = values => {
  const errors = {};
  if (!values.masterId) {
    errors.masterId = 'Required';
  } else if (!MASTER_ID_REGEXP.test(values.masterId)) {
    errors.masterId = 'Only digits are allowed'
  }
  return errors;
}; 

const FindOrdersByMaster = () => {  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {     
      masterId: ''       
    },
    validate,    
    onSubmit: () => navigate('/orders-list-by-master', {state: formik.values.masterId})      
    });
      return (
        <section>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">
           Input master id to get orders list           
          </label>
          <input
            id="masterId"
            name="masterId"
            type="text"
            placeholder='Master id'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}                
            value={formik.values.masterId}              
          />
          {formik.touched.masterId && formik.errors.masterId ? (
          <div className='errmsg'>{formik.errors.masterId}</div>
          ) : null}
          <button type="submit" disabled={
        !(formik.isValid && formik.dirty) ? true : false}>Submit request</button>   
        </form>
        </section> 
      )
   };
   
 
export default FindOrdersByMaster;
