import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Masters from './components/Masters';
import CreateOrder from "./components/CreateOrder";
import OrderReview from './components/OrderReview';
import Success from './components/Success';
import NoMasters from "./components/NoMasters";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import Login from "./components/login";
import WrongLogin from "./components/WrongLogin";
import Footer from "./components/Footer";
import Header from './components/Header';
import Orders from "./components/admin/Orders";

export const CurrentAuthContext = React.createContext(null);

function App() {
  
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    checkLogin();
  }, [])

  const checkLogin = async () => {
    const token = localStorage.getItem("token");     
    if(token) { //(token && token !== 'undefined')
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
        <Route path="/wrong-login" element={<WrongLogin />} />
        <Route path="/" element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />        
      </Routes>      
      <Footer />
    </main>
    </CurrentAuthContext.Provider>   
  );
}

export default App;
