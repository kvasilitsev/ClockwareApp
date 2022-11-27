import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from '../models/regExp';
import { Request } from '../api/api.request';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
 
   if (!values.password) {
     errors.password= 'Required';
   } else if (!PWD_REGEX.test(values.password)) {
     errors.password = 'Invalid password';
   }

   if (!values.confirm_password) {
    errors.confirm_password = 'Required';
   } else if (values.password !== values.confirm_password) {
     errors.confirm_password = 'Password not matched'
   }
 
   return errors;
 }; 
 
  const RegisterAdmin = () => {
   const [success, setSuccess] = useState(false); 
   const formik = useFormik({
     initialValues: {
       name: '',
       email: '',
       password: '',
       confirm_password: ''
     },
     validate,     
     onSubmit: async (values) => {      
      try {
        console.log(values)
        const apiRequest = new Request({name: values.name, email: values.email, password: values.password});
        console.log(apiRequest)
        await apiRequest.registerAdmin();
        setSuccess(true);
      } catch (e) {
        console.log('error: ', e.response.data.message);
        setSuccess(false);
      }      
               
     },
   });
   return (
  <>
   {success ? (
   <section>
    <h1>Success!</h1>
    <p>
     <a href="/login">Sign In</a>
    </p>
   </section>) :
   (<section>
     <h1>Administartor registration</h1>
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="name">
          Name:
          <FontAwesomeIcon icon={faCheck} className={!formik.errors.name && formik.values.name ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={!formik.errors.name || !formik.values.name ? "hide" : "invalid"} />
        </label>
       <input
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
 
       <label htmlFor="email">
         Email:
         <FontAwesomeIcon icon={faCheck} className={!formik.errors.email && formik.values.email ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={!formik.errors.email || !formik.values.email ? "hide" : "invalid"} />
       </label>
       <input
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
 
       <label htmlFor="password">
         Password:
         <FontAwesomeIcon icon={faCheck} className={!formik.errors.password && formik.values.password ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={!formik.errors.password || !formik.values.password ? "hide" : "invalid"} />
       </label>
       <input
         id="password"
         name="password"
         type="password"
         placeholder='Password'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.password}
         aria-invalid={!formik.errors.password ? "false" : "true"} 
       />
       {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}

       <label htmlFor="confirm_password">
         Confirm password:
         <FontAwesomeIcon icon={faCheck} className={!formik.errors.confirm_password && formik.values.confirm_password ? "valid" : "hide"} />
         <FontAwesomeIcon icon={faTimes} className={!formik.errors.confirm_password || !formik.values.confirm_password ? "hide" : "invalid"} />
       </label>
       <input
         id="confirm_password"
         name="confirm_password"
         type="password"
         placeholder='Confirm password'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.confirm_password}   
         aria-invalid={!formik.errors.confirm_password ? "false" : "true"}    
       />
       {formik.touched.confirm_password && formik.errors.confirm_password ? (
         <div>{formik.errors.confirm_password}</div>
       ) : null}
       
       <button type="submit" disabled={
        formik.errors.name || formik.errors.email || formik.errors.password || formik.errors.confirm_password 
        || !formik.values.name || !formik.values.email || !formik.values.password || !formik.values.confirm_password
        ? true : false}>Sign Up</button>
      
     </form>
     <p>
       Already registered?<br />
       <span className="line">         
         <a href='/login'>Sign In</a>
       </span>
     </p>
   </section>)
  }
  </>
   );
 };
 
export default RegisterAdmin;
