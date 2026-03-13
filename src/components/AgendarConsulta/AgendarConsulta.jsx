import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./agendarConsulta.module.css";

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
    <div className={style.agendarPage}>
      <div className={style.agendarContent}>
        <h3 className={style.titleAgendar}>
          Agendar Consulta
        </h3>

        <p className={style.infoMedico}>
          Profissional selecionado:
          <strong> {medico.nome}</strong>
        </p>

        <div className={style.cardAgendar}>
          <div className={style.campoGrupo}>
            <label htmlFor="data">Data da consulta</label>
            <input
              id="data"
              type="date"
              className={style.inputCustom}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className={style.campoGrupo}>
            <label htmlFor="horario">Horário</label>
            <select
              id="horario"
              className={style.inputCustom}
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="09:00">09:00</option>
              <option value="10:30">10:30</option>
              <option value="14:00">14:00</option>
              <option value="15:30">15:30</option>
            </select>
          </div>

          <div className={style.campoGrupo}>
            <label htmlFor="tipo">Tipo de consulta</label>
            <select
              id="tipo"
              className={style.inputCustom}
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>

          <div className={style.campoGrupo}>
            <label htmlFor="obs">Observações</label>
            <textarea
              id="obs"
              className={style.inputCustom}
              rows={3}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Informações adicionais..."
            />
          </div>

          <button
            className={style.btnConfirmar}
            onClick={confirmarAgendamento}
          >
            Confirmar Agendamento
          </button>

          <button
            className={style.btnVoltar}
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}