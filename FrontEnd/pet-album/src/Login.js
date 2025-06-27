import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import API from "./api";

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [errorMsg, setErrorMsg] = useState('')
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        
        const {email, password} = formData

        if (!email || !password){
            setErrorMsg('Please enter email and password.')
            return
        }
        try {
            const params = new URLSearchParams();
            params.append("username", email);  
            params.append("password", password);
            
            const response = await API.post('auth/login',params,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            localStorage.setItem('token',response.data.access_token)
            localStorage.setItem("user", JSON.stringify(response.data.user));

            if (response.status == 200) {navigate('/home')}
        } catch (error) {
            if(error.response && error.response.status == 401){
                setErrorMsg('Invalid email or password.')
            }else{
                setErrorMsg('Login failed. Try again.')
            }
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={11} sm={8} md={6} lg={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <h3 className="text-center mb-4">Welcome Back 🐶</h3>
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                            <div className="text-center mt-3">
                                <small>
                                    Don't have an account? <a href="/register">Register</a>
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginPage;