import { useEffect, useState } from "react";
import { Container, NavLink } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar,NavDropdown } from "react-bootstrap";
import { isAuthenticated,logout } from "./Auth";
import { Link, useNavigate } from "react-router-dom";


function Narbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const userData = localStorage.getItem("user")
        if(userData){
            setUser(JSON.parse(userData))
        }
    },[])
    const handleLogout = ()=>{
        logout()
        navigate("/login")
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>Pet - Album</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink as={Link} to="/home">Home</NavLink>
                    </Nav>
                    <Nav className="ms-auto"> 
                        {!isAuthenticated()? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) :(
                            <NavDropdown title={user?.username || "User"} id="user-dropdown">
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>   
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Narbar;