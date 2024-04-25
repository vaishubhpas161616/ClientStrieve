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
          <Route path="/login" component={Login} />
          <Route path="/change-project" component={Change} />
          <Route path="/client" component={Client} />
          <Route path="/employee" component={Employee} />
          <Route path="/meeting" component={Meeting} />
          <Route path="/payment" component={Payment} />
          <Route path="/project" component={Project} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
