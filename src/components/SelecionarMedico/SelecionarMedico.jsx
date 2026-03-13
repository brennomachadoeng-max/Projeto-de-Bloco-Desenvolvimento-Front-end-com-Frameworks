import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buscarMedicos } from "../../api/selecionarMedico.api";

import style from "./selecionarMedico.module.css";

export default function SelecionarMedico() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMedicos(setMedicos, setCarregando);
  }, []);

  if (carregando) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinnerCustom}></div>
        <p>Carregando profissionais...</p>
      </div>
    );
  }

  return (
    <div className={style.selecionarPage}>
      <div className={style.selecionarContent}>
        <h3 className={style.titleSelecionar}>
          Escolher Profissional
        </h3>

        <p className={style.subtitleSelecionar}>
          Selecione o profissional para realizar a consulta.
        </p>

        <div className={style.medicosList}>
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
    <div className={style.cardMedicoCustom}>
      <div className={style.medicoInfoWrapper}>
        <div className={style.avatarWrapper}>
          <img
            src={medico.foto}
            alt={medico.nome}
            className={style.fotoMedico}
          />
          <span className={style.statusIndicator}></span>
        </div>

        <div className={style.medicoDetails}>
          <div>
            <h6 className={style.nomeMedico}>{medico.nome}</h6>
            <p className={style.especMedico}>{medico.especialidade}</p>
          </div>

          <div className={style.medicoFooter}>
            <span className={style.crmBadge}>CRM Ativo</span>

            <button
              className={style.btnSelecionar}
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