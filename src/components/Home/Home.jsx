import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import style from "./home.module.css";

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
    <div className={style.homePage}>
      <Menu />

      <div className={style.homeContent}>
        <h2 className={`${style.titleHome}`}>Bem-vindo ao MindCare</h2>

        <div className={style.gridCards}>
          <div className={style.homeCard}>
            <h3 className={style.cardTitle}>Agenda</h3>
            <button
              className={style.btnCustom}
              onClick={() => navigate("/Agenda")}
            >
              Abrir Agenda
            </button>
          </div>

          <div className={style.homeCard}>
            <h3 className={style.cardTitle}>Histórico</h3>
            <button
              className={`${style.btnCustom} ${style.btnDisabled}`}
              disabled
            >
              Em breve
            </button>
          </div>

          <div className={`${style.homeCard} ${style.cardDestaque}`}>
            <h3 className={style.cardTitle}>Próxima sessão</h3>

            <div className={style.cardInfo}>
              {proximaConsulta ? (
                <p className={style.textInfo}>
                  <strong>Médico:</strong> {proximaConsulta.nome}
                  <br />
                  <strong>Data:</strong>{" "}
                  {proximaConsulta.data.split("-").reverse().join("/")}
                  <br />
                  <strong>Hora:</strong> {proximaConsulta.horario}
                </p>
              ) : (
                <p>Nenhuma sessão marcada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}