import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {FaTrash } from 'react-icons/fa';

import Swal from 'sweetalert2';


const ProjectEmployees = () => {
    const [projectEmpObj, setProjectEmpObj] = useState({
        "projectEmpId": 0,
        "employeeId": 0,
        "projectId": 0,
        "addedDate": ""
    });
    const [allEmployee, setAllEmployee] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [allProjectEmployees, setAllProjectEmployees] = useState([]);
    const [employeeError, setEmployeeError] = useState('');
    const [projectError, setProjectError] = useState('');
    const [dateError, setDateError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getAllEmp();
        getAllProjects();
        getAllEmpWorkOnProject();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectEmpObj((prevObj) => ({ ...prevObj, [name]: value }));
    };

    const getAllEmp = async () => {
        try {
            const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllEmployee', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setAllEmployee(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const getAllEmpWorkOnProject = async () => {
        try {
            const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllProjectsEmployees', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setAllProjectEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees working on projects:', error);
        }
    };

    const getAllProjects = async () => {
        try {
            const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllClientProjects', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setAllProjects(response.data.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSave = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/AddEmployeeToProject", projectEmpObj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                    }
                });
                if (response.data.result) {
                    Swal.fire('Success!', 'Data Inserted Successfully', 'success');
                    handleReset();
                    getAllEmpWorkOnProject();
                } else {
                    Swal.fire('Error!', response.message, 'error');
                }
            } catch (error) {
                console.error('Error saving data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteData = async (id) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (confirmation.isConfirmed) {
                const response = await axios.delete(`https://freeapi.gerasim.in/api/ClientStrive/DeleteEmployeeFromProject?projectEmpId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                    }
                });
                if (response.data.data) {
                    Swal.fire('Error!', response.data.data, 'error');
                } else {
                    Swal.fire('Success!', response.data.message, 'success');
                    getAllEmpWorkOnProject();
                }
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleReset = () => {
        setProjectEmpObj({
            "projectEmpId": 0,
            "employeeId": 0,
            "projectId": 0,
            "addedDate": ""
        });
        setEmployeeError('');
        setProjectError('');
        setDateError('');
    };

    const validateForm = () => {
        let isValid = true;
        setEmployeeError('');
        setProjectError('');
        setDateError('');

        if (!projectEmpObj.employeeId) {
            setEmployeeError('Please select an employee');
            isValid = false;
        }
        if (!projectEmpObj.projectId) {
            setProjectError('Please select a project');
            isValid = false;
        }
        if (!projectEmpObj.addedDate) {
            setDateError('Please select a date');
            isValid = false;
        }
        return isValid;
    };

    return (
        <div className='row'>
            <div className="col-md-6">
                <div className="card bg-light">
                    <div className="crad-header bg-info p-2">
                        <h4 className='text-center'>Project Lead Employees</h4>
                    </div>
                    <div className="card-body">
                        <table className='table table-bordered '>
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Project Name</th>
                                    <th>Added Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProjectEmployees.map((item) => (
                                    <tr key={item.projectEmpId}>
                                        <td>{item.empName}</td>
                                        <td>{item.projectName}</td>
                                        <td>{item.addedDate}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDeleteData(item.projectEmpId)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className="card bg-light">
                    <div className="card-header bg-info p-2">
                        <h4 className=' text-center'>Project Employee Form</h4>
                    </div>
                    <div className="card-body">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="projectDetails">
                                        <Form.Label>Select Employees</Form.Label>
                                        <select className='form-select' name="employeeId" value={projectEmpObj.employeeId} onChange={handleChange}>
                                            <option value="">Select Employee</option>
                                            {allEmployee.map((emp) => (
                                                <option key={emp.empId} value={emp.empId}>
                                                    {emp.empName}
                                                </option>
                                            ))}
                                        </select>
                                        <small className="text-danger">{employeeError}</small>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="clientId">
                                        <Form.Label>Project Name</Form.Label>
                                        <select className='form-select' name="projectId" value={projectEmpObj.projectId} onChange={handleChange}>
                                            <option value="">Select Project</option>
                                            {allProjects.map((project) => (
                                                <option key={project.clientProjectId} value={project.clientProjectId}>
                                                    {project.projectName}
                                                </option>
                                            ))}
                                        </select>
                                        <small className="text-danger">{projectError}</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="addedDate">
                                        <Form.Label>Added Date</Form.Label>
                                        <Form.Control type="date" name="addedDate" value={projectEmpObj.addedDate} onChange={handleChange} />
                                        <small className="text-danger">{dateError}</small>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <Button variant="primary" type="button" className='mx-2' onClick={handleSave} disabled={loading}>
                                        {loading ? 'Saving...' : 'Submit'}
                                    </Button>
                                    <Button variant="danger" type="button" onClick={handleReset} disabled={loading}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectEmployees;
