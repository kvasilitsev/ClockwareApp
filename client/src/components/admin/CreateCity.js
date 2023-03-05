import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { USER_REGEX } from '../../models/regExp';
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
 
   return errors;
 }; 
 
  const NewCity = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        name: ''              
    },
     validate,     
     onSubmit: async (values) => {      
      try {        
        const apiRequest = new Request({name: values.name });        
        await apiRequest.createCity();        
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }      
      navigate('/cities');      
     },
   });
   return (
  <>  
   <section>
     <h5>Add new city</h5>
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
        <Button variant="secondary" type="submit" className='mt-4' 
          disabled={ formik.errors.name || !formik.values.name  ? true : false }>Add new city
        </Button>      
     </Form>     
   </section>  
  </>
  );
 };
 
export default NewCity;

