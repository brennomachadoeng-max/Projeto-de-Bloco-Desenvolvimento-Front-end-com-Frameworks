import React, { useState } from "react";
import CardConsultas from "./CardConsultas/CardConsultas";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

import style from "./agenda.module.css";

function Agenda({ consultas, removerConsulta }) {
  const navigate = useNavigate();
  const [filtroData, setFiltroData] = useState("");

  const consultasFiltradas = consultas.filter((consulta) => {
    if (!filtroData) return true;
    return consulta.data === filtroData;
  });

  return (
    <div className={style.agendaPage}>
      <Menu />

      <div className={style.agendaContent}>
        {/* Cabeçalho */}
        <header className={style.agendaHeader}>
          <h2 className={style.titleAgenda}>Agenda</h2>
          <p className={style.labelFont}>
            Veja suas consultas e compromissos.
          </p>
        </header>

        {/* Filtro e botão */}
        <div className={style.agendaControls}>
          <input
            type="date"
            className={style.inputCustom}
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />

          <button
            className={style.btnCustom}
            onClick={() => navigate("/SelecionarMedico")}
          >
            + Nova Consulta
          </button>
        </div>

        {/* Lista de Consultas */}
        <div className={style.agendaList}>
          {consultasFiltradas.length === 0 ? (
            <p className={style.textCenter}>
              Nenhuma consulta agendada.
            </p>
          ) : (
            consultasFiltradas.map((consulta, index) => (
              <CardConsultas
                key={index}
                nome={consulta.nome}
                data={consulta.data}
                horario={consulta.horario}
                status={consulta.status}
                observacao={consulta.observacao}
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