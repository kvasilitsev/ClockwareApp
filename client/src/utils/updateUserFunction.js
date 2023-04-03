import { Request } from "../api/api.request";

const updateUser = async(values) => { 
  const{ email, name, id } = values; 
  try { 
    const apiRequest = new Request({email: email, name: name, userId: id});   
    return await apiRequest.updateUser();                  
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }   
}

export default updateUser;

