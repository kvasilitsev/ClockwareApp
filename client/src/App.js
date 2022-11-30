import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Masters from './components/masters';
import  InitialOrder from "./components/initial-order";
import  OrderReview from './components/order-review';
import Success from './components/success';
import NoMasters from "./components/no-masters";
import Register from "./components/register";
import RegisterAdmin from "./components/register-admin";
import Login from "./components/login";
import Logout from "./components/logout";


// function App() {
//   return (
//     <main className="App">     
//       <Order />
//     </main>   
//   );
// }



function App() {
  return (
    <>
    <main className="App">      
      <BrowserRouter>      
        <Routes>
          <Route path="/" element={<InitialOrder />} />
          <Route path="/masters" element={<Masters />} />  
          <Route path="/orderReview" element={<OrderReview />} />
          <Route path="/success" element={<Success />} />
          <Route path="/no-masters" element={<NoMasters />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
    </BrowserRouter>
    </main>
    </>
  );
}

export default App;