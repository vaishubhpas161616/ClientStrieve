import React from 'react';
import { Link } from 'react-router-dom';
// import BreadCrumb from '';


const Navbar = () => {
  const onLogout = () => {
    localStorage.removeItem("loginToken");

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info mb-3">
        <div className="container">
          <Link className="navbar-brand">Navbar</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/change-project">Change Project</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/client">Client</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee-form">EmployeeForm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/meeting">Meeting</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/payment">Payment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/project">Project</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projectEmployees">Project Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={onLogout}>Logout</Link>
              </li>
            </ul>
            <div className="d-flex ">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </div>
          </div>
        </div>
      </nav>
      {/* <BreadCrumb/> */}
    </>

  );
};

export default Navbar;
