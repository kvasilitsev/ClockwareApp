import { Request } from '../api/api.request';

/**
 * Function performs api request createMaster()
 * @param {object} values an object of values
 */
async function addCityForMaster(values) {
   
    try {              
        const apiRequest = new Request({ cityId: values.cityId, masterId: values.masterId });        
        const validate = await apiRequest.addCityForMaster();
        if(validate.isCity){
            window.alert(`Master already works in selected city`);       
          }                     
      } catch (e) {
        console.log('error: ', e.response.data.message);        
      }
      window.alert(`City has been added!`);     
      window.location.replace('/masters');       
}

export default addCityForMaster;

