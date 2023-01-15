import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from '../../models/regExp';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Wrong email format'
  }
  return errors;
}; 

const FindOrdersByUser = () => {  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {     
      email: ''       
    },
    validate,    
    onSubmit: () => navigate('/orders-list-by-user', {state: formik.values.email})      
    });
      return (
        <section>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">
           Input user email to get orders list           
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder='User email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}                
            value={formik.values.email}              
          />
          {formik.touched.email && formik.errors.email ? (
          <div className='errmsg'>{formik.errors.email}</div>
          ) : null}
          <button type="submit" disabled={
        !(formik.isValid && formik.dirty) ? true : false}>Submit request</button>   
        </form>
        </section> 
      )
   };
   
 
export default FindOrdersByUser;
