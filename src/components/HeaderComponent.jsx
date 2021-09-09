import React, { Component } from 'react';
import img1 from '../images/dfb.png'
import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <img src={img1} width='100' alt="logo" />
                        <Container>
                            <Navbar.Brand href="http://localhost:3000/">Home page</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <NavDropdown title="Plannings" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="http://localhost:3000/AddPlanning/0">Ajouter planning</NavDropdown.Item>
                                        <NavDropdown.Item href="http://localhost:3000/plannings">Liste de plannings</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">update planninig</NavDropdown.Item>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">autre</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="http://localhost:3000/seances">Liste de Seances</Nav.Link>
                                    <Nav.Link href="http://localhost:3000/phases">Liste de phases</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link href="#deets">profile</Nav.Link>
                                    <Nav.Link eventKey={2} href="#memes">
                                        log out
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;