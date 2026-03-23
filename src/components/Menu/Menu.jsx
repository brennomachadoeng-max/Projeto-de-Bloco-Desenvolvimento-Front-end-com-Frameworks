import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menu() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("nomeUsuario");    
    navigate("/Login");
  };

  return (
    <Navbar expand="lg" bg="light" className="rounded shadow-sm mb-4 px-3">
      <Navbar.Brand className="fw-bold">MindCare</Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/Agenda">
            Agenda
          </Nav.Link>

          <Nav.Link as={Link} to="/Home">
            Home
          </Nav.Link>
          <Nav.Link 
            onClick={handleLogout} 
            className="text-danger fw-bold"
            style={{ cursor: "pointer" }}
          >
            Sair
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}