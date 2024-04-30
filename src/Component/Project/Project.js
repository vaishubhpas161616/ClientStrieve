import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const [loading, setLoading] = useState(false);
    const [allClients, setAllClients] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [formData, setFormData] = useState({
        clientProjectId: 0,
        projectName: "",
        startDate: "",
        expectedEndDate: "",
        leadByEmpId: 0,
        completedDate: "",
        contactPerson: "",
        contactPersonContactNo: "",
        totalEmpWorking: "",
        projectCost: "",
        projectDetails: "",
        contactPersonEmailId: "",
        clientId: ""
    });
    console.log(formData)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        getAllClients();
        getAllProjects();
        getAllEmployees();
    }, []);

    const getAllClients = async () => {
        try {
            const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllClients', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setAllClients(response.data.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
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

    const getAllEmployees = async () => {
        try {
            const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllEmployee', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setAllEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSave = async () => {
        if (IsValidate()) {
            setLoading(true)
            try {
                const response = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/AddUpdateClientProject", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                    }
                });
                if (response.data.result) {
                    toast.success("Project added successfully");
                    handleReset();
                    getAllProjects();
                    setLoading(false)

                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Error adding project:', error);
                toast.error('Error adding project');
            }
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const response = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/AddUpdateClientProject", formData);
            if (response.data.result) {
                toast.success("Project added successfully");
                handleReset();
                handleCloseModal();
                getAllProjects();
                setLoading(false)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding project:', error);
            toast.error('Error adding project');
        }
    };

    const handleDelete = async (projectId) => {
        try {
            const response = await axios.delete(`https://freeapi.gerasim.in/api/ClientStrive/DeleteProjectByProjectId?projectId=${projectId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            if (response.data.result) {
                toast.success("Project deleted successfully");
                getAllProjects();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Error deleting project');
        }
    };

    const handleEdit = async (projectId) => {
        debugger;
        try {
            const response = await axios.get(`https://freeapi.gerasim.in/api/ClientStrive/GetProjectByProjectId?clientProjectId=${projectId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setFormData( response.data.data);
            handleShowModal();
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Error deleting project');
        }
    };

    const handleReset = () => {
        setFormData({
            projectName: "",
            startDate: "",
            expectedEndDate: "",
            leadByEmpId: "",
            completedDate: "",
            contactPerson: "",
            contactPersonContactNo: "",
            totalEmpWorking: "",
            projectCost: "",
            projectDetails: "",
            contactPersonEmailId: "",
            clientId: ""
        });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const navigateToEmployeeForm = () => {
        navigate("/ProjectEmployees"); // Assuming 'projectTable' is the correct route
    };

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter the value in ";

        if (formData.projectName.trim() === '') {
            isProceed = false;
            errorMessage += 'Project Name, ';
        }
        if (formData.startDate.trim() === '') {
            isProceed = false;
            errorMessage += 'Start Date, ';
        }
        if (formData.expectedEndDate.trim() === '') {
            isProceed = false;
            errorMessage += 'Expected End Date, ';
        }
        if (formData.contactPerson.trim() === '') {
            isProceed = false;
            errorMessage += 'Contact Person, ';
        }
        if (formData.contactPersonContactNo.trim() === '') {
            isProceed = false;
            errorMessage += 'Contact Person Contact No, ';
        }
        if (formData.contactPersonEmailId.trim() === '') {
            isProceed = false;
            errorMessage += 'Contact Person Email, ';
        } else {
            // Check for valid email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.contactPersonEmailId)) {
                isProceed = false;
                errorMessage += 'Valid Contact Person Email, ';
            }
        }

        if (!isProceed) {
            toast.warning(errorMessage.slice(0, -2)); // Remove the trailing comma and space
        }

        return isProceed;
    };

    return (
        <>
       
            <div className='row'>
                <div className="col-10 offset-1">
                    <div className="card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between'>
                                <h1>Project Details</h1>
                                <div>
                                    <Button variant="primary" onClick={handleShowModal}>
                                        Project Form
                                    </Button>
                                </div>
                                <div>
                                    <Button variant="primary" onClick={navigateToEmployeeForm}>
                                        Create Employee Work On Project
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className='table table-border table-border-stripped'>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Project Name</th>
                                        <th>Client Name</th>
                                        <th>Employee Name</th>
                                        <th>Employee EmailId</th>
                                        <th>Employee Designation</th>
                                        <th>Start Date</th>
                                        <th>Expected End Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProjects.map((project, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{project.projectName}</td>
                                            <td>{project.clientName}</td>
                                            <td>{project.empName}</td>
                                            <td>{project.empEmailId}</td>
                                            <td>{project.empDesignation}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.expectedEndDate}</td>
                                            <td>
                                                <button className='btn btn-success mx-1' onClick={() => handleEdit(project.clientProjectId)}>Edit</button>
                                                <button className='btn btn-danger' onClick={() => handleDelete(project.clientProjectId)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="projectName">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="datetime-local" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="expectedEndDate">
                                    <Form.Label>Expected End Date</Form.Label>
                                    <Form.Control type="datetime-local" name="expectedEndDate" value={formData.expectedEndDate} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="leadByEmpId">
                                    <Form.Label>Lead By Employee ID</Form.Label>
                                    <select className='form-select' name="leadByEmpId" value={formData.leadByEmpId} onChange={handleInputChange}>
                                        <option value="">Select Employee</option>

                                        {
                                            allEmployees.map((emp) => {
                                                return (
                                                    <option key={emp.empId} value={emp.empId}>
                                                        {emp.empName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="completedDate">
                                    <Form.Label>Completed Date</Form.Label>
                                    <Form.Control type="datetime-local" name="completedDate" value={formData.completedDate} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="contactPerson">
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="contactPersonContactNo">
                                    <Form.Label>Contact Person Contact No</Form.Label>
                                    <Form.Control type="text" name="contactPersonContactNo" value={formData.contactPersonContactNo} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="contactPersonEmailId">
                                    <Form.Label>Contact Person Email</Form.Label>
                                    <Form.Control type="email" name="contactPersonEmailId" value={formData.contactPersonEmailId} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="totalEmpWorking">
                                    <Form.Label>Total EmpWorking</Form.Label>
                                    <Form.Control type="number" name="totalEmpWorking" value={formData.totalEmpWorking} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="projectCost">
                                    <Form.Label>Project Cost</Form.Label>
                                    <Form.Control type="number" name="projectCost" value={formData.projectCost} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="projectDetails">
                                    <Form.Label>Project Details</Form.Label>
                                    <Form.Control type="text" name="projectDetails" value={formData.projectDetails} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="clientId">
                                    <Form.Label>Client Name</Form.Label>
                                    <select className='form-select' name="clientId" value={formData.clientId} onChange={handleInputChange}>
                                        <option value="">Select Client</option>
                                        {
                                            allClients.map((client) => {
                                                return (
                                                    <option key={client.clientId} value={client.clientId}>
                                                        {client.companyName}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mt-2'>
                            <Col>
                            {
                                formData.clientProjectId===0 &&
                                <Button variant="primary" type="submit" className='mx-2' onClick={handleSave}>
                                    {loading ? 'Saving...' : 'Submit'}
                                </Button>
                            }
                              {
                                formData.clientProjectId !==0 &&
                                <Button variant="warning" className='mx-2' onClick={handleUpdate}>
                                    {loading ? 'Saving...' : 'Update'}
                                </Button>
                              }  
                                
                            </Col>

                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Project;
