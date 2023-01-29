import { Request } from '../api/api.request';

export default async function masters (){
  try {
    const apiRequest = new Request();    
    return await apiRequest.getMasters();         
  } catch (e) {
      console.log('error: ', e.response.data.message);          
  }      
}
