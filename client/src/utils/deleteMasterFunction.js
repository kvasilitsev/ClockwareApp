import { Request } from "../api/api.request";

const deleteMaster = async(id) => {  
  try { 
    const apiRequest = new Request({masterId: id});
    await apiRequest.deleteMaster();           
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default deleteMaster;

