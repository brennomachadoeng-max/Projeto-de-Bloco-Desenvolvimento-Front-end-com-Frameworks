import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Agenda from "./components/Agenda/Agenda";
import AgendarConsulta from "./components/AgendarConsulta/AgendarConsulta";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registrar from "./components/Registrar/Registrar";
import SelecionarMedico from "./components/SelecionarMedico/SelecionarMedico";

// 1. Componente de Proteção: Verifica se o usuário está logado
const RotaPrivada = ({ children }) => {
  const estaLogado = localStorage.getItem("usuarioLogado") === "true";
  
  // Se não estiver logado, redireciona para o Login
  if (!estaLogado) {
    return <Navigate to="/Login" />;
  }
  
  return children;
};

// 2. Componente de Proteção de Perfil: Verifica se é paciente
const RotaPaciente = ({ children }) => {
  const tipo = localStorage.getItem("tipoUsuario");
  
  // Se não for paciente, manda de volta para a Home (médico não agenda)
  if (tipo !== "paciente") {
    return <Navigate to="/Home" />;
  }
  
  return children;
};

function App() {
  const [consultas, setConsultas] = useState([]);

  function adicionarConsulta(novaConsulta) {
    setConsultas((prev) => [...prev, novaConsulta]);
  }

  function removerConsulta(index) {
    setConsultas((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Routes>
      {/* --- ROTAS PÚBLICAS --- */}
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Registrar />} />

      <Route
        path="/Home"
        element={
          <RotaPrivada>
            <Home consultas={consultas} />
          </RotaPrivada>
        }
      />

      <Route
        path="/Agenda"
        element={
          <RotaPrivada>
            <Agenda consultas={consultas} removerConsulta={removerConsulta} />
          </RotaPrivada>
        }
      />
      <Route
        path="/AgendarConsulta"
        element={
          <RotaPrivada>
            <RotaPaciente>
              <AgendarConsulta adicionarConsulta={adicionarConsulta} />
            </RotaPaciente>
          </RotaPrivada>
        }
      />

      <Route
        path="/SelecionarMedico"
        element={
          <RotaPrivada>
            <RotaPaciente>
              <SelecionarMedico />
            </RotaPaciente>
          </RotaPrivada>
        }
      />

      {/* Rota de fallback para evitar páginas em branco */}
      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>
  );
}

export default App;