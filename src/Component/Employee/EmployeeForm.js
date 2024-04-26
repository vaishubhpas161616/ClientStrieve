import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    roleId: 0,
    userName: '',
    empCode: '',
    empName: '',
    empEmailId: '',
    empDesignationId:0,
    empContactNo: '',
    empAltContactNo: '',
    empPersonalEmailId: '',
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: '',
    empState: '',
    empPinCode: '',
    empAddress: '',
    empPerCity: '',
    empPerState: '',
    empPerPinCode: '',
    empPerAddress: '',
    password: '',
    ErpEmployeeSkills: [{ empSkillId: 0, skill: '', totalYearExp: 0, lastVersionUsed: '' }],
    ErmEmpExperiences: [{ empExpId: 0, companyName: '', startDate: '', endDate: '', designation: '', projectsWorkedOn: '' }]
  });

  const [rollName, setRollName]= useState([]);
  const [designation, setDesignation]= useState([])
  console.log(designation)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=>{
    getAllRole();
    getAllDesignation();
  },[]);

  const getAllRole = async () => {
    try {
      const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllRoles',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('loginToken')}`
        }
      });
      // console.log(response)
      setRollName(response.data.data);
      
    } catch (error) {
      console.error("Error fetching roles:", error);
      // Handle error
    }
  }

  const getAllDesignation= async()=>{
    const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllDesignation',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('loginToken')}` 
      }
    });
    console.log(response)
    setDesignation(response.data.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        const result = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/CreateNewEmployee", formData);
        if (result.data.data) {
          alert("Data saved successfully");
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while saving data");
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "Please enter the value in ";

    if (!formData.userName) {
      isValid = false;
      errorMessage += 'User Name, ';
    }
    if (!formData.empCode) {
      isValid = false;
      errorMessage += 'Employee Code, ';
    }
    if (!formData.empId) {
      isValid = false;
      errorMessage += 'Employee ID, ';
    }
    if (!formData.empName) {
      isValid = false;
      errorMessage += 'Employee Name, ';
    }
    if (!formData.empEmailId) {
      isValid = false;
      errorMessage += 'Email, ';
    }
    if (!formData.empDesignationId) {
      isValid = false;
      errorMessage += 'Designation ID, ';
    }
    if (!formData.empContactNo) {
      isValid = false;
      errorMessage += 'Contact No, ';
    }
    if (!formData.empAltContactNo) {
      isValid = false;
      errorMessage += 'Alternate Contact No, ';
    }
    if (!formData.empPersonalEmailId) {
      isValid = false;
      errorMessage += 'Personal Email, ';
    }
    if (!formData.empExpTotalYear) {
      isValid = false;
      errorMessage += 'Total Years of Experience, ';
    }
    if (!formData.empExpTotalMonth) {
      isValid = false;
      errorMessage += 'Total Months of Experience, ';
    }
    if (!formData.empCity) {
      isValid = false;
      errorMessage += 'City, ';
    }
    if (!formData.empState) {
      isValid = false;
      errorMessage += 'State, ';
    }
    if (!formData.empPinCode) {
      isValid = false;
      errorMessage += 'Pin Code, ';
    }
    if (!formData.empAddress) {
      isValid = false;
      errorMessage += 'Address, ';
    }
    if (!formData.empPerCity) {
      isValid = false;
      errorMessage += 'Permanent City, ';
    }
    if (!formData.empPerState) {
      isValid = false;
      errorMessage += 'Permanent State, ';
    }
    if (!formData.empPerPinCode) {
      isValid = false;
      errorMessage += 'Permanent Pin Code, ';
    }
    if (!formData.empPerAddress) {
      isValid = false;
      errorMessage += 'Permanent Address, ';
    }
    if (!formData.password) {
      isValid = false;
      errorMessage += 'Password, ';
    }

    // Check if email is valid using regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.empEmailId)) {
      isValid = false;
      errorMessage += 'Valid Email, ';
    }

    // Check if phone number is valid
    if (!formData.empContactNo.match(/^\d{10}$/)) {
      isValid = false;
      errorMessage += 'Valid Contact No';
    }

    // Display error message if validation fails
    if (!isValid) {
      toast.warning(errorMessage);
    }

    return isValid;
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const skills = [...formData.ErpEmployeeSkills];
    skills[index][name] = value;
    setFormData({
      ...formData,
      ErpEmployeeSkills: skills
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formData.ErmEmpExperiences];
    experiences[index][name] = value;
    setFormData({
      ...formData,
      ErmEmpExperiences: experiences
    });
  };

  const SaveEmployee = async () => {
    if (validateForm()) {
      const result = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/CreateNewEmployee", formData);
      if (result.data.data) {
        alert("Data saved successfully");
      } else {
        alert(result.message);
      }
    }

  };


  return (
    <Container>
      <Card>
        <Card.Header>Employee Form</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="roleId">
                  <Form.Label>Employee Role:</Form.Label>
                  <select className='form-select'  name="roleId" value={formData.roleId} onChange={handleChange}>
                    {
                      rollName.map((rol)=>{
                        return(
                          <option key={rol.roleId} value={rol.roleId}>{rol.role}</option>
                        )
                      })
                    }
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empDesignationId">
                <Form.Label>Employee Designation:</Form.Label>
                  <select className='form-select'  name="empDesignationId" value={formData.empDesignationId} onChange={handleChange}>
                    {
                      designation.map((des)=>{
                        return(
                          <option key={des.designationId} value={des.designationId}>{des.designation}
                          </option>
                        )
                      })
                    }
                  </select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empName">
                  <Form.Label>Employee Name:</Form.Label>
                  <Form.Control type="text" name="empName" value={formData.empName} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="userName">
                  <Form.Label>User Name:</Form.Label>
                  <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empCode">
                  <Form.Label>Employee Code:</Form.Label>
                  <Form.Control type="text" name="empCode" value={formData.empCode} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empName">
                  <Form.Label>Employee Name:</Form.Label>
                  <Form.Control type="text" name="empName" value={formData.empName} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="empEmailId">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" name="empEmailId" value={formData.empEmailId} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empContactNo">
                  <Form.Label>Contact No:</Form.Label>
                  <Form.Control type="text" name="empContactNo" value={formData.empContactNo} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empAltContactNo">
                  <Form.Label>Alternate Contact No:</Form.Label>
                  <Form.Control type="text" name="empAltContactNo" value={formData.empAltContactNo} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="empPersonalEmailId">
                  <Form.Label>Personal Email:</Form.Label>
                  <Form.Control type="email" name="empPersonalEmailId" value={formData.empPersonalEmailId} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empExpTotalYear">
                  <Form.Label>Total Years of Experience:</Form.Label>
                  <Form.Control type="number" name="empExpTotalYear" value={formData.empExpTotalYear} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empExpTotalMonth">
                  <Form.Label>Total Months of Experience:</Form.Label>
                  <Form.Control type="number" name="empExpTotalMonth" value={formData.empExpTotalMonth} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="empCity">
                  <Form.Label>City:</Form.Label>
                  <Form.Control type="text" name="empCity" value={formData.empCity} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empState">
                  <Form.Label>State:</Form.Label>
                  <Form.Control type="text" name="empState" value={formData.empState} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empPinCode">
                  <Form.Label>Pin Code:</Form.Label>
                  <Form.Control type="text" name="empPinCode" value={formData.empPinCode} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="empAddress">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" name="empAddress" value={formData.empAddress} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empPerCity">
                  <Form.Label>Permanent City:</Form.Label>
                  <Form.Control type="text" name="empPerCity" value={formData.empPerCity} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empPerState">
                  <Form.Label>Permanent State:</Form.Label>
                  <Form.Control type="text" name="empPerState" value={formData.empPerState} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="empPerPinCode">
                  <Form.Label>Permanent Pin Code:</Form.Label>
                  <Form.Control type="text" name="empPerPinCode" value={formData.empPerPinCode} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="empPerAddress">
                  <Form.Label>Permanent Address:</Form.Label>
                  <Form.Control type="text" name="empPerAddress" value={formData.empPerAddress} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* ErpEmployeeSkills */}
            {formData.ErpEmployeeSkills.map((skill, index) => (
              <Row key={index}>
                <Col>
                  <Form.Group controlId={`skill${index}`}>
                    <Form.Label>Skill:</Form.Label>
                    <Form.Control type="text" name="skill" value={skill.skill} onChange={(e) => handleSkillChange(index, e)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`totalYearExp${index}`}>
                    <Form.Label>Total Years of Experience:</Form.Label>
                    <Form.Control type="number" name="totalYearExp" value={skill.totalYearExp} onChange={(e) => handleSkillChange(index, e)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`lastVersionUsed${index}`}>
                    <Form.Label>Last Version Used:</Form.Label>
                    <Form.Control type="text" name="lastVersionUsed" value={skill.lastVersionUsed} onChange={(e) => handleSkillChange(index, e)} />
                  </Form.Group>
                </Col>
              </Row>
            ))}

            {/* ErmEmpExperiences */}
            {formData.ErmEmpExperiences.map((experience, index) => (
              <Row key={index}>
                <Col>
                  <Form.Group controlId={`companyName${index}`}>
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control type="text" name="companyName" value={experience.companyName} onChange={(e) => handleExperienceChange(index, e)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`startDate${index}`}>
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="date" name="startDate" value={experience.startDate} onChange={(e) => handleExperienceChange(index, e)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`endDate${index}`}>
                    <Form.Label>End Date:</Form.Label>
                    <Form.Control type="date" name="endDate" value={experience.endDate} onChange={(e) => handleExperienceChange(index, e)} />
                  </Form.Group>
                </Col>
              </Row>
            ))}
            <card-footer> {/* Should be 'card-footer', not 'card-footer' */}
              <div className='row'>
                <div className='col-3'>
                  <Button variant="primary" type="submit" onClick={SaveEmployee}>Save</Button>
                </div>
                <div className='col-3'>
                  <Button variant="warning" type="submit">Update</Button>
                </div>
                <div className='col-3'>
                  <Button variant="danger" type="submit">Cancel</Button>
                </div>
              </div>
            </card-footer>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
