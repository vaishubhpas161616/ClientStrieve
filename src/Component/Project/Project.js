import React, { useEffect, useState } from 'react';
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Project = () => {
    const [allClient, setAllClient] = useState([])

    const [formData, setFormData] = useState({
        clientProjectId: 0,
        projectName: '',
        startDate: '',
        expectedEndDate: '',
        leadByEmpId: 0,
        completedDate: '',
        contactPerson: '',
        contactPersonContactNo: '',
        totalEmpWorking: 0,
        projectCost: 0,
        projectDetails: '',
        contactPersonEmailId: '',
        clientId: 0
    });

    const [show, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        getAllClient();
    }, [])

    const getAllClient = async () => {
        const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllClients', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('loginToken')}`
            }
        });
        setAllClient(response.data.data)
    }

    const handleSave = () => {
        // Check if all fields are filled
        const allFieldsFilled = Object.values(formData).every((value) => value !== '');
        if (allFieldsFilled) {
            // Handle form submission, e.g., send data to server
            console.log(formData);
            // Close the modal
            handleCloseModal();
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleUpdate = () => {

    }

    const handleReset = () => {
        // Reset form fields
        setFormData({
            clientProjectId: 0,
            projectName: '',
            startDate: '',
            expectedEndDate: '',
            leadByEmpId: 0,
            completedDate: '',
            contactPerson: '',
            contactPersonContactNo: '',
            totalEmpWorking: 0,
            projectCost: 0,
            projectDetails: '',
            contactPersonEmailId: '',
            clientId: 0
        });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>
                Open Form Modal
            </Button>
            <Modal show={show} onHide={handleCloseModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Row>
                            <Col>
                                <Form.Group controlId="projectName">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="expectedEndDate">
                                    <Form.Label>Expected End Date</Form.Label>
                                    <Form.Control type="date" name="expectedEndDate" value={formData.expectedEndDate} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="leadByEmpId">
                                    <Form.Label>Lead By Employee ID</Form.Label>
                                    <Form.Control type="number" name="leadByEmpId" value={formData.leadByEmpId} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="completedDate">
                                    <Form.Label>Completed Date</Form.Label>
                                    <Form.Control type="date" name="completedDate" value={formData.completedDate} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="contactPerson">
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="contactPersonContactNo">
                                    <Form.Label>Contact Person Contact No</Form.Label>
                                    <Form.Control type="text" name="contactPersonContactNo" value={formData.contactPersonContactNo} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="contactPersonContactNo">
                                    <Form.Label>Contact Person Contact No</Form.Label>
                                    <Form.Control type="text" name="contactPersonContactNo" value={formData.contactPersonContactNo} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="totalEmpWorking">
                                    <Form.Label>totalEmpWorking</Form.Label>
                                    <Form.Control type="number" name="totalEmpWorking" value={formData.totalEmpWorking} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="projectCost">
                                    <Form.Label>Project Cost</Form.Label>
                                    <Form.Control type="number" name="projectCost" value={formData.projectCost} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="projectDetails">
                                    <Form.Label>Project Details</Form.Label>
                                    <Form.Control type="text" name="projectDetails" value={formData.projectDetails} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="contactPersonEmailId">
                                    <Form.Label>Contact Person Contact No</Form.Label>
                                    <Form.Control type="text" name="contactPersonEmailId" value={formData.contactPersonEmailId} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="clientId">
                                    <Form.Label>Client Name</Form.Label>
                                    <select className='form-select' name="clientId" value={formData.clientId} onChange={handleChange}>
                                        {
                                            allClient.map((client) => {
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
                            <Col>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Button variant="primary" type="submit" className='mx-2'>
                                    Submit
                                </Button>
                                <Button variant="warning" onClick={handleUpdate}>
                                    Update
                                </Button>
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
