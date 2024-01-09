import { Route, Routes } from 'react-router-dom';
import './App.css';
import "./default.css"
import "./responsive.css"
import Tester from './Pages/Tester';
import Contactus from './Pages/Contactus';
import Aboutus from './Pages/Aboutus';
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Automobileinsurance from './Pages/Automobileinsurance';
import Generalliabilityinsurance from './Pages/Generalliabilityinsurance';
import Motorcargoinsurance from './Pages/Motorcargoinsurance';
import Physicaldemage from './Pages/Physicaldemage';
import Main from './Paltaforma/Main';
import LoginPage from './Adminside/Login';
import DashboardPage from './Adminside/DashboardPage';
import { useState } from 'react';
import DetailPage from './Adminside/Detailpage';
import Lastpage from './Paltaforma/Lastpage';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/auto-mobile-insurance" element={<Automobileinsurance />} />
        <Route path="/general-liability-insurance" element={<Generalliabilityinsurance />} />
        <Route path="/motor-cargo-insurance" element={<Motorcargoinsurance />} />
        <Route path="/physical-damage-insurance" element={<Physicaldemage />} />
        <Route path='/get-a-quote' element={<Main />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path='/' element={<Tester />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/done' element={<Lastpage/>}/>
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <DashboardPage />
            ) : (
              <LoginPage setLoggedIn={() => setLoggedIn(true)} />
            )
          }
        />
          <Route
          path="/detail/:id"
          element={
            loggedIn ? (
              <DetailPage />
            ) : (
              <LoginPage setLoggedIn={() => setLoggedIn(true)} />
            )
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;
