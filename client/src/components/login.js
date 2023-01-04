import * as React from 'react';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";

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
        window.location.replace('/');  
      } else {
        navigate('/wrong-login');
      }       
    },
  });

  return (
  <>
    <section>
      <h1>Pease login</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">
          Email:          
        </label>
        <input
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

        <label htmlFor="password">
          Password:          
        </label>
        <input
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

        <button type="submit" disabled={ !(formik.isValid && formik.dirty) ? true : false }>Login</button>  
       
      </form>      
    </section>
   </>
    );
  };
  
 export default Login;
 