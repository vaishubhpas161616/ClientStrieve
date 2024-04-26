import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    empCode: '',
    empName: '',
    empEmailId: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
    let isProceed = true;
    let errorMessage = "Please enter the value in ";
    const { userName, empCode, empName, empEmailId, empContactNo, empAltContactNo, empPersonalEmailId, empExpTotalYear, empExpTotalMonth, empCity, empState, empPinCode, empAddress, empPerCity, empPerState, empPerPinCode, empPerAddress, password } = formData;

    if (!userName) {
      isProceed = false;
      errorMessage += 'User Name, ';
    }
    if (!empCode) {
      isProceed = false;
      errorMessage += 'Employee Code, ';
    }
    if (!empName) {
      isProceed = false;
      errorMessage += 'Employee Name, ';
    }
    if (!empEmailId) {
      isProceed = false;
      errorMessage += 'Email, ';
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(empEmailId)) {
      isProceed = false;
      errorMessage += 'Valid Email, ';
    }
    if (!empContactNo) {
      isProceed = false;
      errorMessage += 'Contact No, ';
    }
   

    if (!isProceed) {
      errorMessage = errorMessage.slice(0, -2); // Remove the last comma and space
      alert(errorMessage);
    }

    return isProceed;
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
    const result = await axios.post("https://freeapi.gerasim.in/api/ClientStrive/CreateNewEmployee", formData);
    if (result.data.data) {
      alert("Data saved successfully");
    } else {
      alert(result.message);
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
