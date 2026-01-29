import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Agenda from "./components/Agenda/Agenda";
import AgendarConsulta from "./components/AgendarConsulta/AgendarConsulta";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Registrar from "./components/Registrar";
import SelecionarMedico from "./components/SelecionarMedico/SelecionarMedico";

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
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Registrar />} />
      <Route path="/Home" element={<Home consultas={consultas} />} />
      <Route
        path="/Agenda"
        element={
          <Agenda
            consultas={consultas}
            removerConsulta={removerConsulta}
          />
        }
      />
      <Route
        path="/AgendarConsulta"
        element={
          <AgendarConsulta adicionarConsulta={adicionarConsulta} />
        }
      />
      <Route path="/SelecionarMedico" element={<SelecionarMedico />} />
    </Routes>
  );
}

export default App;
