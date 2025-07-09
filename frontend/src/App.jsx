import React, { useContext } from 'react';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home.jsx';
import Customize from './pages/Customize.jsx';
import UserDataContext from './context/UserDataContext.js';
import Customize2 from './pages/Customize2.jsx';

function App() {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      <Routes>
        <Route path="/signup" element={!userData?<Signup />:<Navigate to="/"/>} />
        <Route path="/login" element={!userData?<Login />:<Navigate to= "/" />} />
        <Route
          path="/"
          element={
            userData && userData?.assistantimage && userData?.assistantname
              ? <Home />
              : <Navigate to="/customize" />
          }
        />
        <Route path="/customize" element={userData? <Customize /> : <Navigate to ="/signup"/>} />
        <Route path="/customize2" element={userData ? <Customize2 /> : <Navigate to="/signup" />} />

      </Routes>

      {/* ✅ Toast container for global notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
