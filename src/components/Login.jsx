import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/staly.css';
import '../css/login.css';
import { useState } from "react";


function Login() {
    const [erro, setErro] = useState("");

    return (
        <div className='fundo-login d-flex align-items-center justify-content-center vh-100'>
            <div className="card shadow-lg p-4 rounded-3" style={{ width: "22rem", height: "30rem" }}>
                <h3 className="text-center mb-4 font fs-1 fw-bold">Login</h3>
                <Formulario/>
                {erro && (
                    <div className="alert alert-danger mt-3">
                        {erro}
                    </div>
                )}
            </div>
        </div>
    );
}

function Formulario(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

        const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const senha = e.target.senha.value;

            if (email && senha) {
        localStorage.setItem("usuarioLogado", "true");
        localStorage.setItem("nomeUsuario", email);        
        window.location.href = "/home";
        return;
    }

        //Login Utilizando api
        /*
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            const data = await response.text();
            localStorage.setItem("usuarioLogado", "true");
            localStorage.setItem("nomeUsuario", data.usuario);
        } else {
            const errMsg = await response.text();
            setErro(errMsg);
        }
            */
    };

    
    return(
        <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="mb-3 label_font">
                        <label htmlFor="email" className="form-label fw-bold">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail"
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
                            name="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <a href="/ajuda" className="align-self-end mt-2 font_esqueci_senha">Esqueci minha senha</a>

                    <button type="submit" className="btn-custom btn w-100 mb-1 mt-2">Entrar</button>

                    <p className="align-self-center font_ou">ou</p>

                    <a href="/register" className="btn-custom btn w-100">Criar conta</a>
                </form>

    );
}

export default Login;