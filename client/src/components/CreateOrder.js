import React from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { USER_REGEX, EMAIL_REGEX } from '../models/regExp';
import { faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AsyncSelect from 'react-select/async'
import clockOptions from '../utils/clockOptions';
import cityOptions from '../utils/cityOptions'
import DatePicker from "react-datepicker";
import UTCConverter from '../utils/UTCDateConvert';
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import minTime from '../utils/getMinTime';

const validate = values => {
  const errors = {};  

  if (!values.name) {
    errors.name = 'Required';
  } else if (!USER_REGEX.test(values.name)) {
    errors.name = 'Invalid name'
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.clockId) {
    errors.clockId = 'Required';
  }

  if (!values.cityId) {
    errors.cityId = 'Required';
  }

  if (!values.bookingTime) {
    errors.bookingTime = 'Required';
  }
  
  if (Date.parse(values.bookingTime) < Date.now() && values.bookingTime) {
    errors.bookingTime = 'Invalid date or time'
  }  
  if (new Date(values.bookingTime).getHours() < 8 || new Date(values.bookingTime).getHours() > 16){
    errors.bookingTime = 'Invalid time'
  }

  return errors;
}; 
 
const InitialOrder = () => {  
  const navigate = useNavigate();  
  const formik = useFormik({
    initialValues: {         
      clockId: '',
      cityId: '',
      bookingTime: '',
      name: '',
      email: '',     
      city: '',
      clockSize:'',      
    },
    validate,
    onSubmit: async (values) => {
      let list;
      try {        
        const modifyTime = UTCConverter(values.bookingTime); //to convert time to UTC                    
        const apiRequest = new Request({clockId: values.clockId, cityId: values.cityId, bookingTime: modifyTime, email: values.email, masterId: values.masterId}); //for production only when server in UTC zone
        const res = await apiRequest.getFreeMasters();
        if(typeof res === 'string'){
          window.alert(res);
          return;         
        } else {
          list = res;
        }
      } catch (e) {
          console.log('error: ', e.response.data.message);
        }       
        if(list.length > 0){                 
          navigate('/masterSelect', {state: {...formik.values, list: list}}); 
        } else {
          navigate('/no-masters', {state: formik.values});          
        }        
      }      
  });
    return (
    <section>
    <h5>Complete order form</h5>
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
      />        
      {formik.touched.name && formik.errors.name ? (
        <div className='errmsg'>{formik.errors.name}</div>
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
        <div className='errmsg'>{formik.errors.email}</div>
      ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
         Clock size:
        <FontAwesomeIcon icon={faCheck} className={formik.values.clockId ? "valid" : "hide"} />           
        </Form.Label>
      <AsyncSelect 
        className = 'select'       
        onChange={value => {                          
                            formik.setFieldValue('clockId', value.value);
                            formik.setFieldValue('clockSize', value.label);                            
                  }}        
        loadOptions={clockOptions}
        defaultOptions
      />
      {formik.touched.clockId && formik.errors.clockId ? (
        <div className='errmsg'>{formik.errors.clockId}</div>
      ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>
        City:
        <FontAwesomeIcon icon={faCheck} className={formik.values.cityId ? "valid" : "hide"} />           
      </Form.Label>
      <AsyncSelect 
        className = 'select'       
        onChange={value => {
                            formik.setFieldValue('cityId', value.value);
                            formik.setFieldValue('city', value.label);                            
                  }}        
        loadOptions={cityOptions}
        defaultOptions
      />
      {formik.touched.cityId && formik.errors.cityId ? (
        <div className='errmsg'>{formik.errors.cityId}</div>
      ) : null} 
      </Form.Group>
      <Form.Group className="mb-3">   
      <Form.Label>
        Date and time:
        <FontAwesomeIcon icon={faCheck} className={formik.values.bookingTime && !formik.errors.bookingTime ? "valid" : "hide"} />           
        <FontAwesomeIcon icon={faTimes} className={!formik.values.bookingTime || !formik.errors.bookingTime ? "hide" : "invalid"} />
      </Form.Label>     
        <DatePicker
          className='datePicker'
          selected={formik.values.bookingTime}
          timeFormat="HH:mm"
          dateFormat='MMMM d, yyyy, HH:mm'
          name='bookingTime'
          placeholderText = ' Select...'
          showTimeSelect
          minTime={minTime(formik.values.bookingTime)}     
          //minTime={new Date().setHours(7)} // Add ,in time current
          maxTime={new Date().setHours(16)}
          timeIntervals={60}
          minDate={new Date()}
          onChange={selectedDate => formik.setFieldValue('bookingTime',selectedDate)}         
        />     
      { formik.errors.bookingTime && formik.touched.bookingTime ? 
      ( <div className='errmsg'>{formik.errors.bookingTime}</div> ) :
      null }
      </Form.Group>
      <Button type="submit" variant="secondary" className='mt-4' disabled={
        !(formik.isValid && formik.dirty) ? true : false}>Submit request</Button>      
    </Form>    
   </section>)
 }; 
 
export default InitialOrder;
