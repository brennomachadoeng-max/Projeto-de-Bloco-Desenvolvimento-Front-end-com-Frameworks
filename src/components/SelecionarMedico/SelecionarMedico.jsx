import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../../css/selecionarMedico.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


export default function SelecionarMedico() {
  const medicos = [
    {
      id: 1,
      nome: "Dra. Ana Clara Barbosa",
      especialidade: "Psicóloga Clínica",
    },
    {
      id: 2,
      nome: "Dr. Lucas Ferreira",
      especialidade: "Psiquiatra",
    },
    {
      id: 3,
      nome: "Dra. Camila Sanches",
      especialidade: "Psicóloga Infantil",
    },
  ];

  return (
    <Container fluid className="p-3 selecionar-container">

      <h3 className="fw-bold mb-3">Escolher Profissional</h3>
      <p className="text-muted mb-4">
        Selecione o profissional para realizar a consulta.
      </p>

      <Row className="g-3">
        {medicos.map((medico) => (
          <Col xs={12} key={medico.id}>
            <CardSelecionarMedico medico={medico} />
          </Col>
        ))}
      </Row>

    </Container>
  );
}

function CardSelecionarMedico({medico}) {
  const navigate = useNavigate();
  function selecionarMedico(medico) {
    navigate("/AgendarConsulta", { state: { medico } });
  }
  return (
    <Card className="shadow-sm card-medico p-2">
      <div className="d-flex align-items-center">
        <div>
          <h6 className="fw-bold mb-1">{medico.nome}</h6>
          <p className="small text-muted mb-2">{medico.especialidade}</p>

          <Button
            variant="primary"
            size="sm"
            className="mt-1"
            onClick={() => selecionarMedico(medico)}
          >
            Selecionar
          </Button>
        </div>
      </div>
    </Card>
  );
}
