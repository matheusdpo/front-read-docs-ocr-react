import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://192.168.1.15:8080/api/auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data);
            setIsLoggedIn(true);
            setError("");
            navigate("/api-keys");
        } catch (err) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p className="link" onClick={() => navigate("/register")}>
                Não tem uma conta? Registre-se aqui.
            </p>
        </div>
    );
};

export default Login;