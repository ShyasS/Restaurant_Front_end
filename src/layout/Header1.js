/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
import React from 'react';
import '../Header/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: '' }}>
        <Container>
          <Navbar.Brand href="#home" className="col-md-1 ">
            <img
              src={require('../assets/img/grandIndiaLogo1.png')}
              style={{ height: '60px', width: '190px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              style={{ fontSize: '17px', fontWeight: '600', color: '#2a206b' }}
              className="col-md-7 mx-auto"
            >
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Order</Nav.Link>
              <Nav.Link href="#pricing">Profile</Nav.Link>
              <Nav.Link href="#Integrations">Dashboard</Nav.Link>
              <Nav.Link href="#Resources">Active Orders</Nav.Link>
              <Nav.Link href="#Resources">Order History</Nav.Link>
              <Nav.Link href="#Resources">Menus</Nav.Link>
            </Nav>
            <Stack direction="horizontal" gap={3}>
              <Button
                style={{
                  borderRadius: '30px',
                  width: '100px',
                  backgroundColor: '#f0b06c',
                  borderColor: '#f0b06c'
                }}
              >
                Login
              </Button>
              {/* <Form className="d-flex ">
            <Button variant="success" style={{borderRadius:'30px' ,width:'100px'}} >Free trail</Button>
          </Form> */}
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
