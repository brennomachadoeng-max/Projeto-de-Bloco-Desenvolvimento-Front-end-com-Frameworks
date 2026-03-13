import React from "react";
import CardConsultas from "./CardConsultas/CardConsultas";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

import style from "./agenda.module.css";

function Agenda({ consultas, removerConsulta }) {
  const navigate = useNavigate();

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

        {/* Filtros e Ações */}
        <div className={style.agendaControls}>
          <div className={style.controlItem}>
            <input type="date" className={style.inputCustom} />
          </div>

          <div className={style.controlActions}>
            <button
              className={style.btnCustom}
              onClick={() => navigate("/SelecionarMedico")}
            >
              Nova Consulta
            </button>

            <button className={`${style.btnCustom} ${style.btnSecundario}`}>
              Atualizar
            </button>
          </div>
        </div>

        {/* Lista de Consultas */}
        <div className={style.agendaList}>
          {consultas.length === 0 ? (
            <p className={`${style.fontOu} ${style.textCenter}`}>
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