import * as React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./utils/AuthRoute";
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
import Error404 from "./components/Error404";

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
          <Route path="*" element={<Error404 />} />
          <Route path="/masterSelect" element={<MasterSelect />} />
          <Route path="/orderReview" element={<OrderReview />} />
          <Route path="/success" element={<Success />} />
          <Route path="/no-masters" element={<NoMasters />} />          
          <Route path="/login" element={<Login />} />
          <Route path="/wrong-login" element={<WrongLogin />} />
          <Route path="/" element={<CreateOrder />} />          
          <Route path="/orders" element={<AuthRoute><Orders /></AuthRoute>} />
          <Route path="/users" element={<AuthRoute><Users /></AuthRoute>} />
          <Route path="/masters" element={<AuthRoute><Masters /></AuthRoute>} />          
          <Route path="/cities" element={<AuthRoute><Cities /></AuthRoute>} />          
          <Route path="/clocks" element={<AuthRoute><Clocks /></AuthRoute>} />          
        </Routes>
        <Footer />
      </main>
    </CurrentAuthContext.Provider>
  );
}

export default App;
