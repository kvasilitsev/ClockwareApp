import { Request } from "../api/api.request";

const deleteOrder = async(email) => {  
  try { 
    const apiRequest = new Request({email: email});
    await apiRequest.deleteUser();           
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default deleteOrder;
