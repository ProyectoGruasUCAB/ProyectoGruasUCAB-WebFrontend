import React from 'react';
import { Navbar, Container, Form, FormControl } from 'react-bootstrap';
import './header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/LOGO UCAB CON GRUA color.png';

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const userEmail = localStorage.getItem('userEmail');

  return (
    <Navbar className="App-header" bg="dark" variant="dark">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <img src={logo} alt='Logo GruasUCAB' style={{width: '50px'}}/>
        <Navbar.Brand className="logo text-white ms-2">GruasUcab</Navbar.Brand>
        <Form className="d-flex mx-auto search-bar">
          <FormControl
            type="search"
            placeholder="Buscar clientes, conductores, ordenes y más..."
            className="me-2 sbar"
            aria-label="Buscar"
          />
        </Form>
        <div className="icons d-flex align-items-center">
          <span className="text-white me-3">{userEmail || 'Usuario'}</span>
          <i className="fa-solid fa-circle-info me-3"></i>
          <i className="fa-solid fa-gear me-3" onClick={handleProfileClick}></i>
          <i className="fa-solid fa-power-off me-3" onClick={onLogout}></i>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
