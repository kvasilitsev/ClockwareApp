import * as React from "react";
import { Route, Routes } from "react-router-dom";
import MasterSelect from './components/MasterSelect';
import CreateOrder from "./components/CreateOrder";
import OrderReview from './components/OrderReview';
import Success from './components/Success';
import NoMasters from "./components/NoMasters";
import Login from "./components/login";
import WrongLogin from "./components/WrongLogin";
import Footer from "./components/Footer";
import Header from './components/Header';
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import Masters from "./components/admin/Masters";
import Cities from "./components/admin/Cities";
import Clocks from "./components/admin/Clocks";

export const CurrentAuthContext = React.createContext(null);

function App() {

  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    checkLogin();
  }, [])

  const checkLogin = async () => {    
    if (localStorage.getItem("token")) { 
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
          <Route path="/masterSelect" element={<MasterSelect />} />
          <Route path="/orderReview" element={<OrderReview />} />
          <Route path="/success" element={<Success />} />
          <Route path="/no-masters" element={<NoMasters />} />          
          <Route path="/login" element={<Login />} />
          <Route path="/wrong-login" element={<WrongLogin />} />
          <Route path="/" element={<CreateOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/masters" element={<Masters />} />          
          <Route path="/cities" element={<Cities />} />          
          <Route path="/clocks" element={<Clocks />} />          
        </Routes>
        <Footer />
      </main>
    </CurrentAuthContext.Provider>
  );
}

export default App;
