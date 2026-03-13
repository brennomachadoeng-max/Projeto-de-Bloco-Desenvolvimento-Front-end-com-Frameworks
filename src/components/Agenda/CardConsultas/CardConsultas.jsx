import { Card, Button } from "react-bootstrap";

function CardConsultas({ nome, horario, status, onCancelar }) {
  return (
    <Card className="shadow-sm mb-3 agenda-card">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <h6 className="fw-bold mb-1">{nome}</h6>
          <span className="badge bg-success">{status}</span>
        </div>

        <p className="text-muted mb-2">
          Horário: <strong>{horario}</strong>
        </p>

        <div className="d-flex gap-2">
          <Button size="sm" variant="outline-primary" className="flex-fill">
            Ver
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

export default CardConsultas;
