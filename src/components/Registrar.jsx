import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/staly.css';
import '../css/login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Registrar() {
    const [erro, setErro] = useState(null);
    /*
        const handleSubmit = async (e) => {
            e.preventDefault();
            setMensagem(null);
            setErro(null);
    
            try {
                const response = await fetch("http://localhost:8080/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nome, email, senha }),
                });
    
                if (response.status === 409) {
                    setErro("Usuário já cadastrado.");
                }
                else if (response.ok) {
                    const data = await response.text();
                    setMensagem(data);
                    setNome("");
                    setEmail("");
                    setSenha("");
                } else {
                    const data = await response.text();
                    setErro(data);
                }
            } catch (err) {
                setErro("Erro ao conectar com o servidor.");
            }
        };*/

    return (
        <div className="fundo-login d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "22rem" }}>
                <h3 className="text-center mb-4">Cadastro</h3>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <FormularioRegistrar/>
            </div>
        </div>
    );
}

function FormularioRegistrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErro(null);
        if (!nome || !email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }
        console.log("Cadastro demonstrativo:", { nome, email, senha });
        navigate("/Login");
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    minLength="8"
                    maxLength="20"
                    required
                />
                <div className="form-text">A senha deve ter entre 8 e 20 caracteres.</div>
            </div>
            <button type="submit" className="btn btn-custom w-100">Registrar</button>
        </form>
    );
}

export default Registrar;
