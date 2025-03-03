import React from 'react';
import './ui.css';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Sidebar({ role }) {
  return (
    <Nav defaultActiveKey="/orders" className="flex-column Sidebar">
      {(role === 'Administrador' || role === 'Trabajador') && (
        <>
          <Nav.Link as={NavLink} to="/orders" eventKey="/orders" className="sidebar-link"><i className="fa-regular fa-address-book icon"></i>Ordenes</Nav.Link>
          <Nav.Link as={NavLink} to="/client" eventKey="/client" className="sidebar-link"><i className="fa-solid fa-user icon"></i>Clientes</Nav.Link>
        </>
      )}
      <Nav.Link as={NavLink} to="/drivers" eventKey="/drivers" className="sidebar-link"><i className="fa-solid fa-id-card icon"></i>Conductores</Nav.Link>
      {(role === 'Administrador' || role === 'Proveedor') && (
        <>
          <Nav.Link as={NavLink} to="/vehicles" eventKey="/vehicles" className="sidebar-link"><i className="fa-solid fa-truck icon"></i>Vehículos</Nav.Link>
        </>
      )}
      {role === 'Administrador' && (
        <>
          <Nav.Link as={NavLink} to="/operators" eventKey="/operators" className="sidebar-link"><i className="fa-solid fa-phone icon"></i>Operadores</Nav.Link>
          <Nav.Link as={NavLink} to="/providers" eventKey="/providers" className="sidebar-link"><i className="fa-solid fa-clipboard icon"></i>Proveedores</Nav.Link>
          <Nav.Link as={NavLink} to="/suppliers" eventKey="/suppliers" className="sidebar-link"><i className="fa-solid 	fa fa-building icon"></i>Empresas</Nav.Link>
          <Nav.Link as={NavLink} to="/servicios" eventKey="/servicios" className="sidebar-link"><i className="fa-solid fa-fire icon"></i>Servicios</Nav.Link>
          <Nav.Link as={NavLink} to="/departments" eventKey="/departments" className="sidebar-link"><i className="fa-solid fa-layer-group icon"></i>Departamentos</Nav.Link>
          <Nav.Link as={NavLink} to="/notifications" eventKey="/notifications" className="sidebar-link"><i className="fa-solid fa-comment icon"></i>Notificaciones</Nav.Link>
        </>
      )}
      
    </Nav>
  );
}

export default Sidebar;
