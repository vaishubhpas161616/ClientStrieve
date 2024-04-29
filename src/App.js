import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Navbar from './Component/Navbar/Navbar';
import BreadCrumb from './utility/BreadCrumb';
import Login from './Component/Auth/Login';
import Change from './Component/ProjectChange/Change';
import Client from './Component/Client/Client';
import Employee from './Component/Employee/Employee.js';
import Meeting from './Component/Meeting/Meeting';
import Payment from './Component/Payment/Payment';
import Project from './Component/Project/Project';
import EmployeeForm from './Component/Employee/EmployeeForm.js';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <BreadCrumb />
        <Routes>
<<<<<<< HEAD
          <Route path="/Login" element={<Login />} />
          <Route path="/Change-project" element={<Change />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Employee-form" element={<EmployeeForm />} /> 
          <Route path="/Employee-form/:empId" element={<EmployeeForm />} /> 
          <Route path="/Meeting" element={<Meeting />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Project" element={<Project />} />
=======
          <Route path="/login" element={<Login/>} />
          <Route path="/change-project" element={<Change/>} />
          <Route path="/client" element={<Client/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/meeting" element={<Meeting/>} />
          <Route path="/payment" element={Payment} />
          <Route path="/project" element={Project} />
>>>>>>> 3dd026b8ee96839b04ed8b3beb1d6326a1f03d3d
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
