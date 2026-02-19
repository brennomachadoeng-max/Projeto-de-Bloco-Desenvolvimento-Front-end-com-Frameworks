import React from "react";
import CardConsultas from "./CardConsultas";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";
import '../../css/agenda.css'; 

function Agenda({ consultas, removerConsulta }) {
  const navigate = useNavigate();

  return (
    <div className="agenda-page">
      <Menu />

      <div className="agenda-content">
        {/* Cabeçalho */}
        <header className="agenda-header">
          <h2 className="font title-agenda">Agenda</h2>
          <p className="label_font">Veja suas consultas e compromissos.</p>
        </header>

        {/* Filtros e Ações */}
        <div className="agenda-controls">
          <div className="control-item">
            <input type="date" className="input-custom" />
          </div>

          <div className="control-actions">
            <button
              className="btn-custom"
              onClick={() => navigate("/SelecionarMedico")}
            >
              Nova Consulta
            </button>

            <button className="btn-custom btn-secundario">
              Atualizar
            </button>
          </div>
        </div>

        {/* Lista de Consultas */}
        <div className="agenda-list">
          {consultas.length === 0 ? (
            <p className="font_ou text-center">
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
        </div>
      </div>
    </div>
  );
}

export default Agenda;