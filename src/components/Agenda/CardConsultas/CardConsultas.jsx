import { Card, Button } from "react-bootstrap";
import { useState } from "react";

export default function CardConsultas({ nome, data, horario, status, observacao, onCancelar }) {

  const [aberto, setAberto] = useState(false);

  function formatarData(data){
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Card className="shadow-sm mb-3 agenda-card">
      <Card.Body>

        <div className="d-flex justify-content-between">
          <h6 className="fw-bold mb-1">{nome}</h6>
          <span className="badge bg-success">{status}</span>
        </div>

        <p className="text-muted mb-1">
          Data: <strong>{formatarData(data)}</strong>
        </p>

        {aberto && (
          <div className="mt-2 border-top pt-2">
            <p className="mb-1">
              <strong>Médico:</strong> {nome}
            </p>
            <p className="mb-1">
              <strong>Data:</strong> {formatarData(data)}
            </p>
            <p className="mb-1">
              <strong>Hora:</strong> {horario}
            </p>
            <p className="mb-1">
              <strong>Observação:</strong> {observacao || "Nenhuma"}
            </p>
          </div>
        )}

        <div className="d-flex gap-2 mt-2">
          <Button
            size="sm"
            variant="outline-primary"
            className="flex-fill"
            onClick={() => setAberto(!aberto)}
          >
            {aberto ? "Fechar" : "Ver"}
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            className="flex-fill"
            onClick={onCancelar}
          >
            Cancelar
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
}