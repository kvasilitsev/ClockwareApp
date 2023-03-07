import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { USER_REGEX, EMAIL_REGEX } from '../../models/regExp';
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
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!EMAIL_REGEX.test(values.email)) {
     errors.email = 'Invalid email address';
   } 
   return errors;
 }; 
 
  const Register = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        name: '',
        email: ''       
    },
     validate,     
     onSubmit: async (values) => {      
      try {        
        const apiRequest = new Request({name: values.name, email: values.email});        
        const validate = await apiRequest.createUser();              
        if(!validate.isEmail){
          alert(`User with email ${values.email} already exist, please check email`);
          window.location.replace('/users');
        }              
      } catch (e) {
        console.log('error: ', e.response);
      }      
      navigate('/users');      
     },
   });
   return (
  <>  
   <section>
     <h5>New user registartion</h5>
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
         Email:
         <FontAwesomeIcon icon={faCheck} className={!formik.errors.email && formik.values.email ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={!formik.errors.email || !formik.values.email ? "hide" : "invalid"} />
        </Form.Label> 
        <Form.Control
          id="email"
          name="email"
          type="text"
          placeholder='Email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          aria-invalid={!formik.errors.email ? "false" : "true"} 
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        </Form.Group>       
       <Button variant="secondary" type="submit" className='mt-4' disabled={
        formik.errors.name || formik.errors.email || !formik.values.name ||
         !formik.values.email ? true : false}>Register</Button>      
     </Form>     
   </section>  
  </>
  );
 };
 
export default Register;

