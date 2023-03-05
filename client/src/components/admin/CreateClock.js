import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { ID_REGEXP } from '../../models/regExp';
import { Request } from '../../api/api.request';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

 const validate = values => {
   const errors = {}; 
   if (!values.size) {
     errors.size = 'Required';
   } 
   if (!values.repairDuration) {
    errors.repairDuration = 'Required';
  } else if (!ID_REGEXP.test(values.repairDuration)) {
    errors.repairDuration = 'Invalid repair duration'
  };
 
   return errors;
 }; 
 
  const NewClock = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        size: '',
        repairDuration: ''             
    },
     validate,     
     onSubmit: async (values) => {                 
      try {        
        const apiRequest = new Request({ size: values.size, repairDuration: values.repairDuration });        
        await apiRequest.createClock();        
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }      
      navigate('/clocks');      
     },
   });
   return (
  <>  
   <section>
     <h5>Add new clocok size</h5>
     <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>
          Clock size:
          <FontAwesomeIcon icon={faCheck} className={!formik.errors.size && formik.values.size ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={!formik.errors.size || !formik.values.size ? "hide" : "invalid"} />
        </Form.Label>        
        <Form.Control
          id="size"
          name="size"
          type="text"
          placeholder='Clocok size'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
          value={formik.values.size}
          aria-invalid={!formik.errors.size ? "false" : "true"}         
        />        
        {formik.touched.size && formik.errors.size ? (
          <div>{formik.errors.size}</div>
        ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>
          Repair duration:
          <FontAwesomeIcon icon={faCheck} className={!formik.errors.repairDuration && formik.values.repairDuration ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={!formik.errors.repairDuration || !formik.values.repairDuration ? "hide" : "invalid"} />
        </Form.Label>        
        <Form.Control
          id="repairDuration"
          name="repairDuration"
          type="text"
          placeholder='Repair duration'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}        
          value={formik.values.repairDuration}
          aria-invalid={!formik.errors.repairDuration ? "false" : "true"}         
        />        
        {formik.touched.repairDuration && formik.errors.repairDuration ? (
          <div>{formik.errors.repairDuration}</div>
        ) : null}
        </Form.Group>             
        <Button variant="secondary" type="submit" className='mt-4' 
          disabled={ formik.errors.size || !formik.values.size 
            || formik.errors.repairDuration || !formik.values.repairDuration
            ? true : false }>Add new clock size
        </Button>      
     </Form>     
   </section>  
  </>
  );
 };
 
export default NewClock;

