import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Masters from './components/masters';
import  Order from "./components/order";


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
          <Route path="/" element={<Order />} />
          <Route path="/masters" element={<Masters />} />         
        </Routes>
    </BrowserRouter>
    </main>
    </>
  );
}

export default App;