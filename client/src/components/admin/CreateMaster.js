import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { USER_REGEX, RATING_REGEX } from '../../models/regExp';
import { Request } from '../../api/api.request';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

 const validate = values => {
   const errors = {}; 
   if (!values.name) {
     errors.name = 'Required';
   } else if (!USER_REGEX.test(values.name)) {
     errors.name = 'Invalid name'
   };
 
   if (!values.rating) {
     errors.rating = 'Required';
   } else if (!RATING_REGEX.test(values.rating)) {
     errors.rating = 'Invalid rating';
   } 
   return errors;
 }; 
 
  const MasterRegistration = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        name: '',
        rating: ''       
    },
     validate,     
     onSubmit: async (values) => {      
      try {        
        const apiRequest = new Request({name: values.name, rating: values.rating});        
        await apiRequest.createMaster();        
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }      
      navigate('/masters');      
     },
   });
   return (
  <>  
   <section>
     <h5>New master registartion</h5>
     <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>
          Name:
          <FontAwesomeIcon icon={faCheck} className={!formik.errors.name && formik.values.name ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={!formik.errors.name || !formik.values.name ? "hide" : "invalid"} />
        </Form.Label>        
        <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder='Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
          value={formik.values.name}
          aria-invalid={!formik.errors.name ? "false" : "true"}         
        />        
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        </Form.Group>        
        <Form.Group className="mb-3">
        <Form.Label>
         Rating:
         <FontAwesomeIcon icon={faCheck} className={!formik.errors.rating && formik.values.rating ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={!formik.errors.rating || !formik.values.rating ? "hide" : "invalid"} />
        </Form.Label> 
        <Form.Control
          id="rating"
          name="rating"
          type="text"
          placeholder='Rating'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
          aria-invalid={!formik.errors.rating ? "false" : "true"} 
        />
        {formik.touched.rating && formik.errors.rating ? (
          <div>{formik.errors.rating}</div>
        ) : null}
        </Form.Group>       
       <Button variant="secondary" type="submit" className='mt-4' disabled={
        formik.errors.name || formik.errors.rating || !formik.values.name ||
         !formik.values.rating ? true : false}>Register</Button>      
     </Form>     
   </section>  
  </>
  );
 };
 
export default MasterRegistration;

