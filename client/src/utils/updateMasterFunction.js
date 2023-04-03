import { Request } from "../api/api.request";

const updateMaster = async(values) => { 
  const { rating, name, id } = values; 
  try {    
    const apiRequest = new Request({rating: rating, name: name, masterId: id});   
    return await apiRequest.updateMaster();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateMaster;

