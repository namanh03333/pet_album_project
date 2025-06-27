import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import API from "./api";
function RegisterPage() {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        username: '',
        phone: ''
    })

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        const { email, password, username, phone } = formData

        if (!email || !password || !username || !phone) {
            setErrorMsg('Please fill in all fields.');
            return;
        }

        try{
            const respone = await API.post('/auth/register',formData)
            setErrorMsg('');
            setSuccessMsg('Register successful!');
            console.log('Registering:', formData);

        }catch (error){
            if (error.response && error.response.data) {
                setErrorMsg(error.response.data.detail || 'Registration failed.');
            }else {
                setErrorMsg('Network error. Try again later.');
            }
            console.error('Registration error:', error);
        }

        
    }
    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={11} sm={8} md={6} lg={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <h3 className="text-center mb-4">Create Account 🐱</h3>
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            {successMsg && <Alert variant="success">{successMsg}</Alert>}
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Choose a username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="success" type="submit" size="lg">
                                        Register
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-3">
                                <small>
                                    Already have an account? <a href="/login">Login</a>
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}
export default RegisterPage;