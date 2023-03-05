import { Request } from "../api/api.request";

const deleteCity = async(id) => {  
  try { 
    const apiRequest = new Request({cityId: id});
    await apiRequest.deleteCity();           
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default deleteCity;

