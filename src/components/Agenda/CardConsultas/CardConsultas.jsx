import { useState } from "react";
import style from "./cardConsultas.module.css";

export default function CardConsultas({ nome, data, horario, status, observacao, onCancelar }) {
  const [aberto, setAberto] = useState(false);

  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className={style.card}>
      <div className={style.header}>
        <h6 className={style.nomeMedico}>{nome}</h6>
        <span className={style.statusBadge}>{status}</span>
      </div>

      <p className={style.dataTexto}>
        Data: <strong>{formatarData(data)}</strong>
      </p>

      {aberto && (
        <div className={style.detalhes}>
          <p><strong>Médico:</strong> {nome}</p>
          <p><strong>Data:</strong> {formatarData(data)}</p>
          <p><strong>Hora:</strong> {horario}</p>
          <p><strong>Observação:</strong> {observacao || "Nenhuma"}</p>
        </div>
      )}

      <div className={style.footer}>
        <button
          className={`${style.btn} ${style.btnVer}`}
          onClick={() => setAberto(!aberto)}
        >
          {aberto ? "Fechar" : "Ver"}
        </button>

        <button
          className={`${style.btn} ${style.btnCancelar}`}
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}