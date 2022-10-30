import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Masters from './components/masters';
import  InitialOrder from "./components/initialOrder";


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
        </Routes>
    </BrowserRouter>
    </main>
    </>
  );
}

export default App;