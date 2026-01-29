import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/agendarConsulta.css";

export default function AgendarConsulta({ adicionarConsulta }) {
  const navigate = useNavigate();
  const location = useLocation();
  const medico = location.state?.medico;
  if (!medico) {
    navigate("/Agenda");
    return null;
  }

  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacao, setObservacao] = useState("");

  function confirmarAgendamento() {
    if (!data || !horario || !tipo) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const novaConsulta = {
      nome: medico.nome,
      data,
      horario,
      tipo,
      observacao,
      status: "Confirmada",
    };
    adicionarConsulta(novaConsulta);
    navigate("/Agenda");
  }

  return (
    <Container fluid className="p-3 agendar-container">
      <h3 className="fw-bold mb-3">Agendar Consulta</h3>

      <p className="text-muted mb-2">
        Profissional selecionado:
        <strong> {medico.nome}</strong>
      </p>

      <Card className="p-3 border-0 shadow-sm">
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Data da consulta</Form.Label>
          <Form.Control
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Horário</Form.Label>
          <Form.Select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="09:00">09:00</option>
            <option value="10:30">10:30</option>
            <option value="14:00">14:00</option>
            <option value="15:30">15:30</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Tipo de consulta</Form.Label>
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Se desejar, escreva alguma informação adicional..."
          />
        </Form.Group>

        <Button
          variant="primary"
          className="w-100 py-2 fw-bold mt-2"
          style={{ borderRadius: "12px" }}
          onClick={confirmarAgendamento}
        >
          Confirmar Agendamento
        </Button>
      </Card>
    </Container>
  );
}
