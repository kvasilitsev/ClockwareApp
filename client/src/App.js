import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Masters from './components/Masters';
import InitialOrder from "./components/CreateOrder";
import OrderReview from './components/OrderReview';
import Success from './components/Success';
import NoMasters from "./components/NoMasters";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import Login from "./components/Login";
import WrongLogin from "./components/WrongLogin";
import Footer from "./components/Footer";
import Header from './components/Header';
import FindAllOrders from "./components/admin/FindAllOrders";
import FindOrdersByMaster from "./components/admin/FindOrdersByMaster";
import OrderListByMaster from "./components/admin/OrderListByMaster";
import FindOrdersByUser from "./components/admin/FindOrdersByUser";
import OrderListByUser from "./components/admin/OrderListByUser";

export const CurrentAuthContext = React.createContext(null);

function App() {
  
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    checkLogin();
  }, [])

  const checkLogin = async () => {
    const token = localStorage.getItem("token");    
    if(token && token !== 'undefined') {
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
        <Route path="/" element={<InitialOrder />} />
        <Route path="/all-orders" element={<FindAllOrders />} /> 
        <Route path="/find-orders-by-master" element={<FindOrdersByMaster />} />
        <Route path="/orders-list-by-master" element={<OrderListByMaster />} />
        <Route path="/find-orders-by-user" element={<FindOrdersByUser />} />
        <Route path="/orders-list-by-user" element={<OrderListByUser />} />       
      </Routes>
      <Footer />
    </main>
    </CurrentAuthContext.Provider>   
  );
}

export default App;
