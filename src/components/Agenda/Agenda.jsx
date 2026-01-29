import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CardConsultas from "./CardConsultas";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";

function Agenda({ consultas, removerConsulta }) {
  const navigate = useNavigate();

  return (
    <Container fluid className="agenda-container px-0">
      <Menu />

      <Row className="mb-3 p-3">
        <Col>
          <h2 className="fw-bold">Agenda</h2>
          <p className="text-muted">Veja suas consultas e compromissos.</p>
        </Col>
      </Row>

      <Row className="mb-3 p-3">
        <Col xs={12} md={4} className="mb-2">
          <input type="date" className="form-control" />
        </Col>

        <Col xs={12} md={4} className="text-md-end d-flex flex-row">
          <Button
            variant="primary"
            className="me-2 w-100 mb-2"
            onClick={() => navigate("/SelecionarMedico")}
          >
            Nova Consulta
          </Button>

          <Button variant="outline-secondary" className="w-100">
            Atualizar
          </Button>
        </Col>
      </Row>

      {consultas.length === 0 ? (
        <p className="text-muted text-center mt-4">
          Nenhuma consulta agendada.
        </p>
      ) : (
        consultas.map((consulta, index) => (
          <CardConsultas
            key={index}
            nome={consulta.nome}
            horario={consulta.horario}
            status={consulta.status}
            onCancelar={() => removerConsulta(index)}
          />
        ))
      )}
    </Container>
  );
}

export default Agenda;
