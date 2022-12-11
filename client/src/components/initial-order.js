import React from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { USER_REGEX, EMAIL_REGEX } from '../models/regExp';
import { faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AsyncSelect from 'react-select/async'
import clockOptions from '../models/clock-options';
import cityOptions from '../models/city-options'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  return errors;
}; 
 
const InitialOrder = (props) => {  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nextState: 'masters',    
      clockId: '',
      cityId: '',
      bookingTime: '',
      name: '',
      email: '',
      list: '',
      city: '',
      clockSize:'',      
    },
    validate,
    onSubmit: async (values) => {
      try {
        const apiRequest = new Request({clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime, email: values.email, masterId: values.masterId});        
        const res = await apiRequest.getFreeMasters();
        formik.values.list = res.data;
      } catch (e) {
          console.log('error: ', e.response.data.message);          
        }        
        if(formik.values.list.length > 0){               
          props.context(formik.values);                   
          //navigate('/masters', {state: formik.values});
        } else {          
          formik.values.nextState = 'no-masters';
          props.context(formik.values);
        }        
      }      
  });
    return (  
    <section>
    <h5>Complete order form</h5>
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
      />        
      {formik.touched.name && formik.errors.name ? (
        <div className='errmsg'>{formik.errors.name}</div>
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
        <div className='errmsg'>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="clockId">
        Clock size:
        <FontAwesomeIcon icon={faCheck} className={formik.values.clockId ? "valid" : "hide"} />           
      </label>
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
      <label htmlFor="cityId">
        City:
        <FontAwesomeIcon icon={faCheck} className={formik.values.cityId ? "valid" : "hide"} />           
      </label>
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
      <label htmlFor="bookingTime">
        Date and time:
        <FontAwesomeIcon icon={faCheck} className={formik.values.bookingTime && !formik.errors.bookingTime ? "valid" : "hide"} />           
        <FontAwesomeIcon icon={faTimes} className={!formik.values.bookingTime || !formik.errors.bookingTime ? "hide" : "invalid"} />
      </label>     
        <DatePicker
          className='datePicker'
          selected={formik.values.bookingTime}
          dateFormat='MMMM d, yyyy, hh:mm'
          name='bookingTime'
          placeholderText = ' Select...'
          showTimeSelect
          minTime={new Date().setHours(7)}
          maxTime={new Date().setHours(16)}         
          timeIntervals={60}
          minDate={new Date()}
          onChange={date => formik.setFieldValue('bookingTime',date)}
        />     
      { formik.errors.bookingTime && formik.touched.bookingTime ? 
      ( <div className='errmsg'>{formik.errors.bookingTime}</div> ) :
      null }      
      <button type="submit" disabled={
        !(formik.isValid && formik.dirty) ? true : false}>Submit request</button>      
    </form>    
   </section>)
 };
 
export default InitialOrder;
