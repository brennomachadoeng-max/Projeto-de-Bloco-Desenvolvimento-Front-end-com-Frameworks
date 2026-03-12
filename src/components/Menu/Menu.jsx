import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menu() {
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

          <Nav.Link as={Link} to="/" className="text-danger fw-bold">
            Sair
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}