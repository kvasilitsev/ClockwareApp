import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { USER_REGEX, EMAIL_REGEX } from '../models/regExp';
import { faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AsyncSelect from 'react-select/async'
import clockLookUp from '../models/clock-lookup';
import cityLookUp from '../models/city-lookup'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const clockOptions = async() => await clockLookUp;
const cityOptions = async() => await cityLookUp;


const validate = values => {
  const errors = {};

  if (Date.parse(values.bookingTime) < Date.now()) {
    errors.bookingTime = 'Invalid date or time'
  };

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
 
const InitialOrder = () => {  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
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
        navigate('/masters', {state: formik.values})
      }      
  });
    return (  
    <section>
    <h1>Complete order form</h1>
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
      <label htmlFor="bookingTime">
        Date and time:
        <FontAwesomeIcon icon={faCheck} className={formik.values.bookingTime && !formik.errors.bookingTime ? "valid" : "hide"} />           
        <FontAwesomeIcon icon={faTimes} className={!formik.errors.bookingTime ? "hide" : "invalid"} />
      </label>
      <div className='datePicker'>
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
      </div>
      { formik.errors.bookingTime ? 
      ( <div className='errmsg'>{formik.errors.bookingTime}</div> ) :
      null }      
      <button type="submit" disabled={
        !formik.values.clockId || !formik.values.cityId || !formik.values.bookingTime ||
        !formik.values.name || !formik.values.email
        ? true : false}>Submit request</button>      
    </form>    
   </section>)
 };
 
export default InitialOrder;
