import React, { useEffect, useState } from "react";
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Change = () => {
  const [empList, setEmpList] = useState([]);
  const [projectChangeList, setProjectChangeList] = useState([]);
  const [formData, setFormData] = useState({
    projectChangeId: 0,
    projectId: 1,
    changeDetails: "string",
    changeDate: "",
    approvedByEmpId: 0,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleReset();
  };
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
    });
  };

  useEffect(() => {
    getAllEmployee();
    getAllProjects();
  }, []);

  const getAllEmployee = async () => {
    const response = await axios.get(
      "https://freeapi.gerasim.in/api/ClientStrive/GetAllEmployee",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      }
    );
    setEmpList(response.data.data);
  };

  const getAllProjects = async () => {
    const response = await axios.get(
      "https://freeapi.gerasim.in/api/ClientStrive/GetAllClientProjects",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      }
    );
    console.log(response)
    setProjectChangeList(response.data.data)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      debugger;
      const response = await axios.post(
        "https://freeapi.gerasim.in/api/ClientStrive/AddUpdateProjectChange",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        }
      );
      debugger;
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
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="card bg-light">
              <div className="card-header bg-info">
                <div className="row mt-2">
                  <div className="col-md-10 text-start">
                    Get All Project Change List
                  </div>
                  <div className="col-md-2 text-end">
                    <Button
                      variant="primary"
                      className="btn-md m-1 text-right"
                      onClick={handleShow}
                    >
                      {" "}
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
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
        </div>
      </div>
    </>
  );
};

export default Change;
