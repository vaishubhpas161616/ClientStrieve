import React, { useEffect, useState } from "react";
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Change = () => {
  const [empList, setEmpList] = useState([]);
  const [formData, setFormData] = useState({
    projectChangeId: 0,
    projectId: 0,
    changeDetails: "string",
    changeDate: "",
    approvedByEmpId: 0,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      projectChangeId: 0,
      projectId: 0,
      changeDetails: "string",
      changeDate: "",
      approvedByEmpId: 0,
    })
  }

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = async () => {
    debugger;
    const response = await axios.get(
      "https://freeapi.gerasim.in/api/ClientStrive/GetAllEmployee",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      }
    );
    console.log(response);
    setEmpList(response.data.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://freeapi.gerasim.in/api/ClientStrive/AddUpdateProjectChange",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      if (response.data.result) {
        toast.success("Data inserted Successfully");
        handleClose();
      }
    } catch (error) {
      toast.error("Error:", error);
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
              <Form.Label>Change Details:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="changeDetails"
                value={formData.changeDetails}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="changeDate">
              <Form.Label>Change Date:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="changeDate"
                value={formData.changeDate.split("T")[0]}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="roleId">
              <Form.Label>Employee:</Form.Label>
              <select
                className="form-select"
                name="roleId"
                value={formData.approvedByEmpId}
                onChange={handleChange}
              >
                {empList.map((emp) => {
                  return (
                    <option key={emp.empId} value={emp.empId}>
                      {emp.empName}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            {formData.projectChangeId === 0 ? (
              <Button variant="primary" type="submit" className="mt-2">
                Submit
              </Button>
            ) : (
              <Button variant="warning" type="submit" className="mt-2">
                Update
              </Button>
            )}
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
