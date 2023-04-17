import React from 'react';
import { CurrentAuthContext } from '../App';
import Login from "../components/login"

const AuthRoute = ({ children }) => {
  const isAuth = React.useContext(CurrentAuthContext);  
  return isAuth ? children : <Login />;
};

export default AuthRoute;

