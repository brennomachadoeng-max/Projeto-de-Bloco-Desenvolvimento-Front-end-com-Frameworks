import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

export default function Home({ consultas }) {
  const navigate = useNavigate();
  const agora = new Date();

  const proximaConsulta = consultas
    .map((c) => ({
      ...c,
      dataHora: new Date(`${c.data}T${c.horario}`)
    }))
    .filter((c) => !isNaN(c.dataHora) && c.dataHora > agora)
    .sort((a, b) => a.dataHora - b.dataHora)[0];

  return (
    <Container fluid className="p-0">
      <Menu />

      <Row className="g-4 p-3">
        <h2 className="fw-bold">Bem-vindo ao MindCare</h2>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Agenda</Card.Title>
              <Button className="w-100" onClick={() => navigate("/Agenda")}>
                Abrir Agenda
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Histórico</Card.Title>
              <Button disabled className="w-100">
                Em breve
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Próxima sessão</Card.Title>

              {proximaConsulta ? (
                <>
                  <p>
                    <strong>Médico:</strong> {proximaConsulta.nome}<br />
                    <strong>Data:</strong>{" "}
                    {proximaConsulta.data.split("-").reverse().join("/")}
                    <br />
                    <strong>Hora:</strong> {proximaConsulta.horario}
                  </p>
                </>
              ) : (
                <p className="text-muted">Nenhuma sessão marcada</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
