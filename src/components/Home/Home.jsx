import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import '../../css/home.css';

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
    <div className="home-page">
      <Menu />

      <div className="home-content">
        <h2 className="font title-home">Bem-vindo ao MindCare</h2>

        <div className="grid-cards">
          <div className="home-card">
            <h3 className="label_font card-title">Agenda</h3>
            <button className="btn-custom" onClick={() => navigate("/Agenda")}>
              Abrir Agenda
            </button>
          </div>

          <div className="home-card">
            <h3 className="label_font card-title">Histórico</h3>
            <button className="btn-custom btn-disabled" disabled>
              Em breve
            </button>
          </div>

          <div className="home-card card-destaque">
            <h3 className="label_font card-title">Próxima sessão</h3>
            <div className="card-info">
              {proximaConsulta ? (
                <p className="label_font text-info">
                  <strong>Médico:</strong> {proximaConsulta.nome}<br />
                  <strong>Data:</strong>{" "}
                  {proximaConsulta.data.split("-").reverse().join("/")}
                  <br />
                  <strong>Hora:</strong> {proximaConsulta.horario}
                </p>
              ) : (
                <p className="font_ou">Nenhuma sessão marcada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}