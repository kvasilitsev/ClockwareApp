import { Request } from '../api/api.request';

async function cities (){
  try {
    const apiRequest = new Request();    
    return await apiRequest.getCities();         
  } catch (e) {
      console.log('error: ', e.response.data.message);          
    }      
  }
const cityOptions = async() => {
  const citiesArr = await cities();
  return citiesArr.map(city => {
    city['label'] = city['name'];
    city['value'] = city['id'];
    delete city['name'];
    delete city['id'];
    return city;  
  })
}

export default cityOptions;
