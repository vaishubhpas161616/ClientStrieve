import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Navbar from './Component/Navbar/Navbar';
import BreadCrumb from './utility/BreadCrumb';
import Login from './Component/Auth/Login';
import Change from './Component/ProjectChange/Change';
import Client from './Component/Client/Client';
import Employee from './Component/Employee/Employee';
import Meeting from './Component/Meeting/Meeting';
import Payment from './Component/Payment/Payment';
import Project from './Component/Project/Project';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <BreadCrumb />
        <Routes>
          <Route path="/login" element={Login} />
          <Route path="/change-project" element={<Change/>} />
          <Route path="/client" element={<Client/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/meeting" element={<Meeting/>} />
          <Route path="/payment" element={Payment} />
          <Route path="/project" element={Project} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
