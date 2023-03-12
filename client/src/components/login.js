import * as React from 'react';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const validate = values => {
  const errors = {};  
  if (!values.password) {
    errors.name = 'Required';
  }   
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
}; 

const Login = (props) => {  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {        
      email: '',
      password: ''        
    },
    validate, 
    onSubmit: async (values) => {      
      try {
        const apiRequest = new Request({email: values.email, password: values.password});  
        const res = await apiRequest.login();
        localStorage.setItem("token", res);
      } catch (e) {        
        console.log('error: ', e.response.data.message);        
      }
      if (localStorage.token !== 'undefined') {                
        window.location.replace('/orders');       
      } else {
        navigate('/wrong-login');
      }       
    },
  });

  return (
  <>
    <section>
      <h3>Please login</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>
            Email:          
        </Form.Label>
        <Form.Control
          id="email"
          name="email"
          type="text"
          placeholder='Email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}           
        />        
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>
          Password:          
        </Form.Label>
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder='Password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}           
        />       
          {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
          ) : null}
        <div className="d-grid mt-4">
        <Button type="submit" variant="secondary" disabled={ !(formik.isValid && formik.dirty) ? true : false }>Login</Button>
        </div>        
        </Form.Group>
      </Form>      
    </section>
   </>
    );
  };
  
 export default Login;
 