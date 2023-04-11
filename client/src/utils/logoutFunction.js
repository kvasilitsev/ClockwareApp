import { Request } from '../api/api.request';

const logout = async() => {  
  try { const apiRequest = new Request();
    await apiRequest.logout();
    localStorage.removeItem('token');        
    window.location.replace('/');                   
    } catch (e) {
      console.log('error: ', e.response.data.message);
    }
  };
  
 export default logout;
 