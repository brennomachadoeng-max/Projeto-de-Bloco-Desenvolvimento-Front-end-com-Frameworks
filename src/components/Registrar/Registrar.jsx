import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./registrar.module.css";

function Registrar() {
    const [erroGeral, setErroGeral] = useState(null);

    return (
        <div className={style.fundoLogin}>
            <div className={style.cardRegistro}>
                <h3 className={style.titulo}>Cadastro</h3>
                {erroGeral && <div className={style.alertaErro}>{erroGeral}</div>}
                <FormularioRegistrar setErroGeral={setErroGeral} />
            </div>
        </div>
    );
}

function FormularioRegistrar({ setErroGeral }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("paciente"); 
    const [erroLocal, setErroLocal] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErroLocal(null);

        if (!nome || !email || !senha || !tipoUsuario) {
            setErroLocal("Preencha todos os campos corretamente.");
            return;
        }

        const novoUsuario = { nome, email, senha, tipoUsuario };
        localStorage.setItem("usuarioCadastrado", JSON.stringify(novoUsuario));
        
        navigate("/Login");
    };

    return (
        <form onSubmit={handleSubmit} className={style.formulario}>
            <div className={style.campoGrupo}>
                <label htmlFor="nome" className={style.label}>Nome Completo</label>
                <input 
                    type="text" 
                    className={style.input} 
                    id="nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                />
            </div>

            <div className={style.campoGrupo}>
                <label htmlFor="email" className={style.label}>E-mail</label>
                <input 
                    type="email" 
                    className={style.input} 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            <div className={style.campoGrupo}>
                <label htmlFor="tipoUsuario" className={style.label}>Tipo de Perfil</label>
                <select 
                    className={style.select} 
                    id="tipoUsuario"
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    required
                >
                    <option value="paciente">Paciente</option>
                    <option value="medico">Médico</option>
                </select>
            </div>

            <div className={style.campoGrupo}>
                <label htmlFor="senha" className={style.label}>Senha</label>
                <input
                    type="password"
                    className={style.input}
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    minLength="8"
                    maxLength="20"
                    required
                />
                <span className={style.helperText}>Use entre 8 e 20 caracteres.</span>
            </div>

            {erroLocal && <div className={style.erroLocal}>{erroLocal}</div>}

            <button type="submit" className={style.btnPrincipal}>Criar Conta</button>
            
            <button 
                type="button" 
                className={style.btnLink} 
                onClick={() => navigate("/Login")}
            >
                Já tenho uma conta
            </button>
        </form>
    );
}

export default Registrar;