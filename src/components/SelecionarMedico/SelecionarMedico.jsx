import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buscarMedicos } from "../../api/selecionarMedico.api";
import "../../css/selecionarMedico.css";
import "../../css/staly.css";

export default function SelecionarMedico() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMedicos(setMedicos, setCarregando);
  }, []);

  if (carregando) {
    return (
      <div className="loading-container">
        <div className="spinner-custom"></div>
        <p className="label_font">Carregando profissionais...</p>
      </div>
    );
  }

  return (
    <div className="selecionar-page">
      <div className="selecionar-content">
        <h3 className="font title-selecionar">Escolher Profissional</h3>
        <p className="label_font subtitle-selecionar">
          Selecione o profissional para realizar a consulta.
        </p>

        <div className="medicos-list">
          {medicos.map((medico) => (
            <CardSelecionarMedico key={medico.id} medico={medico} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CardSelecionarMedico({ medico }) {
  const navigate = useNavigate();

  function selecionarMedico() {
    navigate("/AgendarConsulta", { state: { medico } });
  }

  return (
    <div className="card-medico-custom">
      <div className="medico-info-wrapper">
        <div className="avatar-wrapper">
          <img
            src={medico.foto}
            alt={medico.nome}
            className="foto-medico"
          />
          <span className="status-indicator"></span>
        </div>

        <div className="medico-details">
          <div className="medico-header">
            <h6 className="font nome-medico">{medico.nome}</h6>
            <p className="label_font espec-medico">{medico.especialidade}</p>
          </div>
          
          <div className="medico-footer">
            <span className="crm-badge">CRM Ativo</span>
            <button
              className="btn-custom btn-selecionar"
              onClick={selecionarMedico}
            >
              Selecionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}