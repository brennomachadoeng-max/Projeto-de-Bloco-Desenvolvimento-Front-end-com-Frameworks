import "../../css/selecionarMedico.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { buscarMedicos } from "../../api/selecionarMedico.api";


export default function SelecionarMedico() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMedicos(setMedicos, setCarregando);
  }, []);

  if (carregando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Carregando profissionais...</p>
      </Container>
    );
  }

return (
    <Container fluid className="p-3 selecionar-container">
      <h3 className="fw-bold mb-3">Escolher Profissional</h3>
      <p className="text-muted mb-4">Selecione o profissional para realizar a consulta.</p>

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

function CardSelecionarMedico({ medico }) {
  const navigate = useNavigate();

  function selecionarMedico(medico) {
    navigate("/AgendarConsulta", { state: { medico } });
  }

  return (
    <Card className="shadow-sm border-0 mb-3 overflow-hidden" style={{ borderRadius: "15px" }}>
      <div className="d-flex align-items-center p-3">
        <div className="position-relative">
          <img
            src={medico.foto}
            alt={medico.nome}
            className="rounded-circle border border-2 border-primary p-1"
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />
          <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" 
                style={{ width: "15px", height: "15px" }}></span>
        </div>
        <div className="ms-3 flex-grow-1">
          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.1rem" }}>
            {medico.nome}
          </h6>
          <p className="text-primary fw-medium small mb-2">
            {medico.especialidade}
          </p>
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-light text-muted fw-normal">CRM Ativo</span>
            <Button
              variant="primary"
              size="sm"
              className="px-4 rounded-pill shadow-sm"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
              onClick={() => selecionarMedico(medico)}
            >
              Selecionar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
