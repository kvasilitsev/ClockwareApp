import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Masters from './components/masters';
import  InitialOrder from "./components/initial-order";
import  OrderReview from './components/order-review';
import Success from './components/success';
import NoMasters from "./components/no-masters";

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
        </Routes>
    </BrowserRouter>
    </main>
    </>
  );
}

export default App;