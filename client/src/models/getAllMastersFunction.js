import { Request } from '../api/api.request';

export default async function masters (){
  try {
    const apiRequest = new Request();    
    const masters =  await apiRequest.getMasters();
    return masters;        
  } catch (e) {
      console.log('error: ', e.response.data.message);          
  }      
}
