import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";

function Login() {
    const [erro, setErro] = useState("");

    return (
        <div className={style.fundoLogin}>
            <div className={style.cardLogin}>
                <h3 className={style.titleLogin}>Login</h3>
                <Formulario setErro={setErro} /> 
                {erro && (
                    <div className={style.erroMensagem}>
                        {erro}
                    </div>
                )}
            </div>
        </div>
    );
}

function Formulario({ setErro }){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro("");
        const dadosCadastrados = localStorage.getItem("usuarioCadastrado");

        if (dadosCadastrados) {
            const usuario = JSON.parse(dadosCadastrados);

            if (email === usuario.email && senha === usuario.senha) {
                localStorage.setItem("usuarioLogado", "true");
                localStorage.setItem("nomeUsuario", usuario.nome);
                localStorage.setItem("tipoUsuario", usuario.tipoUsuario);                 
                navigate("/Home"); 
            } else {
                setErro("E-mail ou senha incorretos.");
            }
        } else {
            setErro("Nenhuma conta encontrada. Por favor, registre-se primeiro.");
        }
    };

    return(
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <div className={style.campoGrupo}>
                <label htmlFor="email" className={style.labelFont}>E-mail</label>
                <input
                    type="email"
                    className={style.inputCustom}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={style.campoGrupo}>
                <label htmlFor="senha" className={style.labelFont}>Senha</label>
                <input
                    type="password"
                    className={style.inputCustom}
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <a href="/ajuda" className={style.fontEsqueciSenha}>Esqueci minha senha</a>
            <button type="submit" className={style.btnCustom}>Entrar</button>
            <p className={style.fontOu}>ou</p>            
            <button 
                type="button" 
                onClick={() => navigate("/register")} 
                className={style.btnCustom + " " + style.btnLink}
            >
                Criar conta
            </button>
        </form>
    );
}

export default Login;