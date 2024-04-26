import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EmployeeForm = () => {
  // Define state to hold form data
  const [formData, setFormData] = useState({
    userName: '',
    empCode: '',
    empId: 0,
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
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

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle changes in skill input fields
  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const skills = [...formData.ErpEmployeeSkills];
    skills[index][name] = value;
    setFormData({
      ...formData,
      ErpEmployeeSkills: skills
    });
  };

  // Handle changes in experience input fields
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const experiences = [...formData.ErmEmpExperiences];
    experiences[index][name] = value;
    setFormData({
      ...formData,
      ErmEmpExperiences: experiences
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend or perform other actions
    console.log(formData);
  };

  return (
    <> 
    <Container style={{ backgroundColor:"skyblue", padding: '20px', position:"absolute", top:'7%', zIndex:"-1", right:'20%'}}>
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
            <Form.Group controlId="empId">
              <Form.Label>Employee ID:</Form.Label>
              <Form.Control type="number" name="empId" value={formData.empId} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="empName">
              <Form.Label>Employee Name:</Form.Label>
              <Form.Control type="text" name="empName" value={formData.empName} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="empEmailId">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="empEmailId" value={formData.empEmailId} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="empDesignationId">
              <Form.Label>Designation ID:</Form.Label>
              <Form.Control type="number" name="empDesignationId" value={formData.empDesignationId} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
          <Col>
            <Form.Group controlId="empPersonalEmailId">
              <Form.Label>Personal Email:</Form.Label>
              <Form.Control type="email" name="empPersonalEmailId" value={formData.empPersonalEmailId} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
        </Row>

        <Row>
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
          <Col>
            <Form.Group controlId="empPerPinCode">
              <Form.Label>Permanent Pin Code:</Form.Label>
              <Form.Control type="text" name="empPerPinCode" value={formData.empPerPinCode} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="empPerAddress">
              <Form.Label>Permanent Address:</Form.Label>
              <Form.Control type="text" name="empPerAddress" value={formData.empPerAddress} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
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
            <Col>
              <Form.Group controlId={`designation${index}`}>
                <Form.Label>Designation:</Form.Label>
                <Form.Control type="text" name="designation" value={experience.designation} onChange={(e) => handleExperienceChange(index, e)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`projectsWorkedOn${index}`}>
                <Form.Label>Projects Worked On:</Form.Label>
                <Form.Control type="text" name="projectsWorkedOn" value={experience.projectsWorkedOn} onChange={(e) => handleExperienceChange(index, e)} />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
 
    </>
    
  );
};

export default EmployeeForm;
