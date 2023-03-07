import * as React from "react";
import { Route, Routes } from "react-router-dom";
import MasterSelect from './components/MasterSelect';
import CreateOrder from "./components/CreateOrder";
import OrderReview from './components/OrderReview';
import Success from './components/Success';
import NoMasters from "./components/NoMasters";
import CreateUser from "./components/admin/CreateUser";
import RegisterAdmin from "./components/RegisterAdmin";
import Login from "./components/login";
import WrongLogin from "./components/WrongLogin";
import Footer from "./components/Footer";
import Header from './components/Header';
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import Masters from "./components/admin/Masters";
import CreateMaster from "./components/admin/CreateMaster";
import Cities from "./components/admin/Cities";
import CreateCity from "./components/admin/CreateCity";
import Clocks from "./components/admin/Clocks";
import CreateClock from "./components/admin/CreateClock";

export const CurrentAuthContext = React.createContext(null);

function App() {

  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    checkLogin();
  }, [])

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (token && token !== 'undefined') { 
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
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wrong-login" element={<WrongLogin />} />
          <Route path="/" element={<CreateOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/createMaster" element={<CreateMaster />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/createCity" element={<CreateCity />} />
          <Route path="/clocks" element={<Clocks />} />
          <Route path="/createClock" element={<CreateClock />} />
        </Routes>
        <Footer />
      </main>
    </CurrentAuthContext.Provider>
  );
}

export default App;
