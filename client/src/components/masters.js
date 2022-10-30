import React from 'react';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import MasterList from './masterList';
import { useLocation } from 'react-router-dom';

const Masters = props => {
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      masterId: '',
      name: state.name,
      email: state.email,
      cityId: state.cityId,
      clockId: state.clockId,
      bookingTime: state.bookingTime,
      list: state.list     
    }, 
    onSubmit: values => console.log(values) //temp until createOtrder fix
    // onSubmit: async (values) => {      
    //   try {
    //     console.log(values.clockId, values.cityId, values.bookingTime, values.email, values.masterId);
    //     const apiRequest = new Request({clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime, email: values.email, masterId: values.masterId});        
    //     const res = await apiRequest.createOrder(); 
    //     console.log(res.data)    //temp                
    //   } catch (e) {
    //       console.log('error: ', e.response);          
    //     }   
    //   }
  });
    return (  
    <section>
      <h1>Select master</h1>
      <form onSubmit={formik.handleSubmit}> 
        <div onChange={value => formik.setFieldValue('masterId', value.target.value)}> {/* value.target.value ??? */}
          <MasterList 
            masters = { formik.values.list }
          />
        </div>
        <button type="submit" disabled={ !formik.values.masterId ? true : false}>Submit request</button>
      </ form>
    </ section>)
 };
 
export default Masters;
