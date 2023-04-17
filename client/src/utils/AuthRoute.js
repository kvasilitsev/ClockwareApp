import React from 'react';
import { CurrentAuthContext } from '../App';
import Error404 from "../components/Error404"

const AuthRoute = ({ children }) => {
  const isAuth = React.useContext(CurrentAuthContext);  
  return isAuth ? children : <Error404 />;
};

export default AuthRoute;

