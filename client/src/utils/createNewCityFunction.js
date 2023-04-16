import { Request } from '../api/api.request';

const validate = values => {
  let errors = false;
  if (!values.name) {
    window.alert('City Required');
    errors = true;
    return  errors;
  }
  return  errors;
};

/**
 * Function performs api request createCity()
 * @param {object} values an object of values
 */
async function createNewCity(values) {   
  const validation = validate(values);  
  if(!validation){
    try {              
        const apiRequest = new Request({ name: values.name });              
        const validate = await apiRequest.createCity();        
        if(validate.isCity){
            window.alert(`City ${values.name} already exist, please check the city`);        
          }                     
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }      
  }     
}

export default createNewCity;

