import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/staly.css';
import '../css/login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [erro, setErro] = useState("");

    return (
        <div className='fundo-login d-flex align-items-center justify-content-center vh-100'>
            <div className="card shadow-lg p-4 rounded-3" style={{ width: "22rem", height: "30rem" }}>
                <h3 className="text-center mb-4 font fs-1 fw-bold">Login</h3>
                <Formulario setErro={setErro} /> 
                {erro && (
                    <div className="alert alert-danger mt-3 py-2 small">
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
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="mb-3 label_font">
                <label htmlFor="email" className="form-label fw-bold">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-1 label_font">
                <label htmlFor="senha" className="form-label fw-bold">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn-custom btn w-100 mb-1 mt-2">Entrar</button>
        </form>
    );
}

export default Login;