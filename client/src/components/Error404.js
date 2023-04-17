import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Error404 = (props) => {  
  return (
    <div className='error404'>
      <h1>404</h1>
      <p>Sorry, this page does not exist</p>
      <Button className="mt-5" variant='secondary' as={Link} to="/">Return to main page</Button>      
    </div>
  );
}

export default Error404;

