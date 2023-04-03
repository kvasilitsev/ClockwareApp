import { Request } from "../api/api.request";

const updateCity = async(values) => {
  const{ name, id } = values; 
  try { 
    const apiRequest = new Request({name: name, cityId: id});   
    return await apiRequest.updateCity();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateCity;
