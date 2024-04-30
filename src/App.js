import React, { useState } from 'react';
import { BrowserRouter  as Router, Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Component/Navbar/Navbar';
import BreadCrumb from './utility/BreadCrumb';
import Login from './Component/Auth/Login';
import Layout from './Component/Layout/Layout';
import Payment from './Component/Payment/Payment';
import Change from './Component/ProjectChange/Change';
import Client from './Component/Client/Client';
import Employee from './Component/Employee/Employee';
import Meeting from './Component/Meeting/Meeting';
import Project from './Component/Project/Project';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loginToken") == null ? false : true
  );

  return (
<div className="App">
    <BrowserRouter>
      <ToastContainer 
      theme='colored'
      position="top-center" 
      autoClose={1000} 
      closeButton={false}/>
      <Navbar />
        <Routes>
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/change-project" element={<Change />} />
          <Route path="/client" element={<Client />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/project" element={<Project />} />
          <Route path="/*" element={loggedIn ? <Layout /> : <Navigate to="/login" replace />} />
        </Routes>
        
    </BrowserRouter>
  </div>
  );
};

export default App;
