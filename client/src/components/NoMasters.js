import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoMasters = (props) => { 
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {       
      navigate('/', { replace: true });
    }, 8000);
  });
  return (
    <div>     
      <p>Sorry, currently we do not have available masters in this city for selected date/time. Please try to select another date or time.</p>
    </div>
  );
}

export default NoMasters;
