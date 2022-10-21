import React from 'react';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomSelect } from './customSelect'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const clockOptions = [{value: process.env.REACT_APP_CLOCK_ID_SMALL, label:'Small'},
  {value: process.env.REACT_APP_CLOCK_ID_MEDIUM, label:'Medium'},
  {value: process.env.REACT_APP_CLOCK_ID_LARGE, label:'Large' }
];

const cityOptions = [{value: process.env.REACT_APP_CITY_ID_DNIPRO, label:'Dnipro'},
  {value: process.env.REACT_APP_CITY_ID_UZHGOROD, label:'Uzhgorod'}
];

const validate = values => {
  const errors = {};
  if (Date.parse(values.bookingTime) < Date.now()) {
    errors.bookingTime = 'Invalid date or time'
  };
  return errors;
}; 
 
const GetMasters = () => {
  const formik = useFormik({
    initialValues: {
      clockId: '',
      cityId: '',
      bookingTime: ''
    },
    validate,
    onSubmit: async (values) => {      
      try {
        const apiRequest = new Request({clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime});        
        const res = await apiRequest.order(); 
        console.log(res.data)    //temp                
      } catch (e) {
          console.log('error: ', e.response.data.message);          
        }   
      }
  });
    return (  
    <section>
      <h1>Get available masters</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="clockId">
           Clock size:
           <FontAwesomeIcon icon={faCheck} className={formik.values.clockId ? "valid" : "hide"} />           
        </label>
        <CustomSelect
        className = 'select'       
        onChange={value => formik.setFieldValue('clockId',value.value)}
        value={formik.values.clockId}
        options={clockOptions}
        />
        <label htmlFor="cityId">
           City:
           <FontAwesomeIcon icon={faCheck} className={formik.values.cityId ? "valid" : "hide"} />           
        </label>
        <CustomSelect
        className = 'select'                 
        onChange={value => formik.setFieldValue('cityId',value.value)}
        value={formik.values.cityId}
        options={cityOptions}
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
        {formik.errors.bookingTime ? (
          <div className='errmsg'>{formik.errors.bookingTime}</div>
          ) 
          : null}
        <button type="submit" disabled={
        !formik.values.clockId || !formik.values.cityId || !formik.values.bookingTime
        ? true : false}>Submit request</button>      
      </form>    
   </section>)
 };
 
export default GetMasters;
