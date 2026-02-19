import '../css/staly.css';
import '../css/login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [erro, setErro] = useState("");

    return (
        <div className='fundo-login'>
            <div className="card-login">
                <h3 className="font title-login">Login</h3>
                <Formulario setErro={setErro} /> 
                {erro && (
                    <div className="erro-mensagem">
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (email && senha) {
            localStorage.setItem("usuarioLogado", "true");
            localStorage.setItem("nomeUsuario", email);                    
            navigate("/home"); 
        } else {
            setErro("Por favor, preencha todos os campos.");
        }
    };

    return(
        <form onSubmit={handleSubmit} className="form-container">
            <div className="campo-grupo label_font">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className="input-custom"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="campo-grupo label_font">
                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    className="input-custom"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>

            <a href="/ajuda" className="font_esqueci_senha">Esqueci minha senha</a>

            <button type="submit" className="btn-custom">Entrar</button>
            
            <p className="font_ou">ou</p>
            
            <a href="/register" className="btn-custom btn-link">Criar conta</a>
        </form>
    );
}

export default Login;