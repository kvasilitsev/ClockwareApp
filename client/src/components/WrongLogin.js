import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WrongLogin = (props) => { 
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {       
      navigate('/', { replace: true });
    }, 8000);
  });
  return (
    <div>     
      <p>Sorry, login/password is not correct!</p>
    </div>
  );
}

export default WrongLogin;
