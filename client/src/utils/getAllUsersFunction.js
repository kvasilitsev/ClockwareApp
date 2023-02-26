import { Request } from "../api/api.request";

const findAllUsers = async() => {
  let res = null;
  try { 
    const apiRequest = new Request({});
    res = await apiRequest.getAllUsers();                   
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }  
  return res;
}

export default findAllUsers ;

