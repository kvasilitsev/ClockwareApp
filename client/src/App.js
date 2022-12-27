import React from "react";
//import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import  Masters from './components/masters';
import  InitialOrder from "./components/initial-order";
import  OrderReview from './components/order-review';
import Success from './components/success';
import NoMasters from "./components/no-masters";
import Register from "./components/register";
import RegisterAdmin from "./components/register-admin";
import Login from "./components/login";
import Logout from "./components/logout";
import AdminHeader from "./components/admin-header";
import WrongLogin from "./components/wrong-login";
import Footer from "./components/footer";
import Header from './components/home-header';

function App() {
  // const [state, setState] = useState(null);  
  // const context = (state) => {
  //   setState(state);
  // }  
  return (
    <>
    <main className="App">      
      {localStorage.token === undefined && (<Header />)}
      {localStorage.token !== undefined && (<AdminHeader />)}      
        <Routes>          
          <Route path="/masters" element={<Masters />} /> 
          <Route path="/orderReview" element={<OrderReview />} />
          <Route path="/success" element={<Success />} />
          <Route path="/no-masters" element={<NoMasters />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin-header" element={<AdminHeader />} />
          <Route path="/wrong-login" element={<WrongLogin />} />
          <Route path="/" element={<InitialOrder />} />          
        </Routes>
      <Footer />
    </main>
    </>
  );
}

export default App;