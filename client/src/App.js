import React from "react";
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
import AdminMenu from "./components/admin-menu";
//import Home from "./pages/home";
import Footer from "./components/footer";
import Header from './components/home-header';



// function App() {
//   return (
//     <main className="App">     
//       <Order />
//     </main>   
//   );
// }



// function App() {
//   return (
//     <>
//     <main className="App">          
//         <Routes>         
//           <Route path="/initial-order" element={<InitialOrder />} />
//           <Route path="/masters" element={<Masters />} />  
//           <Route path="/orderReview" element={<OrderReview />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/no-masters" element={<NoMasters />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/register-admin" element={<RegisterAdmin />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/admin-menu" element={<AdminMenu />} />
//           <Route path="/" element={<Home />} />
//         </Routes>
//     </main>
//     </>
//   );
// }

function App() {
  return (
    <>
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
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/" element={<InitialOrder />} />          
        </Routes>
      <Footer />
    </main>
    </>
  );
}

export default App;