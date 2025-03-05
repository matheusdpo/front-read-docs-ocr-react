import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://192.168.1.15:8081/api/auth/register", {
                username,
                password,
            });

            localStorage.setItem("token", response.data);
            setIsLoggedIn(true);
            setError("");
            navigate("/api-keys");
        } catch (err) {
            setError("Erro ao registrar. Tente novamente.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Registro</h1>
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
            <button onClick={handleRegister}>Registrar</button>
            <p className="link" onClick={() => navigate("/login")}>
                Já tem uma conta? Faça login aqui.
            </p>
        </div>
    );
};

export default Register;