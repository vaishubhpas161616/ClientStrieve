import React, { useState } from 'react';
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
const Change = () => {

    const [formData, setFormData] = useState({
        projectChangeId: 0,
        projectId: 0,
        changeDetails: "string",
        changeDate: "2024-04-26T06:54:33",
        approvedByEmpId: 0
      });
      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validation
        const { projectChangeId, projectId, changeDetails, changeDate, approvedByEmpId } = formData;
        if (!projectChangeId || !projectId || !changeDetails || !changeDate || !approvedByEmpId) {
          alert("Please fill in all fields.");
          return;
        }

        try {
          const response = await axios.post('https://freeapi.gerasim.in/api/ClientStrive/AddUpdateProjectChange',formData);
            if(response.data.result){
                toast.success("Data inserted Successfully");
                handleClose(); 
            }
          
        } catch (error) {
          toast.error('Error:', error);
        }
      };
    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Open Form Modal
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Project Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="changeDetails">
              <Form.Label>Change Details</Form.Label>
              <Form.Control as="textarea" rows={3} name="changeDetails" value={formData.changeDetails} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="changeDate">
              <Form.Label>Change Date</Form.Label>
              <Form.Control type="datetime-local" name="changeDate" value={formData.changeDate} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="warning" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default Change;