import React from 'react';
import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import sweetAlertService from "../../Service/sweetAlertServices";
import { toast } from 'react-toastify';


const Login = () => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;

    if (emailId === "" || password === "") {
      isValid = false;
      toast.warning("Please enter both username and password");
    }
    return isValid;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

    }


  };
  return (
    <>
        <div className="login-page">
          <Container >
            <Row className="justify-content-center">
              <Col xs={12} md={5} className="login-form">
                <h1 className='text-center'>Login</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group >
                    <Form.Label className='font-lg'>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={emailId}
                      onChange={handleEmailChange}
                    />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label className='font-lg'>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>

                  <div className="text-center mt-2 " >
                    <Button variant="primary" type="submit" className='btn-lg'>
                      Login
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
    </>
  );
};

export default Login;