import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Masters from './components/masters';
import InitialOrder from "./components/initial-order";
import OrderReview from './components/order-review';
import Success from './components/success';
import NoMasters from "./components/no-masters";
import Register from "./components/register";
import RegisterAdmin from "./components/register-admin";
import Login from "./components/login";
import Logout from "./components/logout";
import WrongLogin from "./components/wrong-login";
import Footer from "./components/footer";
import Header from './components/header';

export const CurrentAuthContext = React.createContext(null);

function App() {
  
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    checkLogin();
  }, [])

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if(token) {
      setAuthState('true');
    } else {
      setAuthState(null);
    }
  } 
  return (
    <CurrentAuthContext.Provider value={authState}>    
    <main className="App">      
     <Header />
      <Routes>          
        <Route path="/masters" element={<Masters />} /> 
        <Route path="/orderReview" element={<OrderReview />} />
        <Route path="/success" element={<Success />} />
        <Route path="/no-masters" element={<NoMasters />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />        
        <Route path="/wrong-login" element={<WrongLogin />} />
        <Route path="/" element={<InitialOrder />} />          
      </Routes>
      <Footer />
    </main>
    </CurrentAuthContext.Provider>   
  );
}

export default App;