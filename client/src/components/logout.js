import React from 'react';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  return (
  <>
    <section>      
      <button onClick={async () => {
        try { const apiRequest = new Request();
              await apiRequest.logout();
              localStorage.removeItem('token');              
              navigate('/');                        
        } catch (e) {
          console.log('error: ', e.response.data.message);
        }        
      }}>Logout</button>       
    </section>
   </>
    );
  };
  
 export default Logout;
 