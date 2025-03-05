import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApiKeys = ({ setIsLoggedIn }) => {
    const [apiKeys, setApiKeys] = useState([]); // Estado para armazenar as API Keys
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Função para buscar as API Keys do backend
    const fetchApiKeys = async () => {
        try {
            const response = await axios.get("http://192.168.1.15:8081/api/auth/api-keys", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApiKeys(response.data); // Atualiza o estado com as API Keys
            setError("");
        } catch (err) {
            setError("Erro ao buscar API Keys.");
            console.error(err);
        }
    };

    // Função para remover uma API Key
    const handleRemoveKey = async (key) => {
        try {
            await axios.delete(`http://192.168.1.15:8081/api/auth/api-key/${key}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Atualiza a lista de API Keys após a remoção
            setApiKeys(apiKeys.filter((apiKey) => apiKey.key !== key));
            setError("");
        } catch (err) {
            setError("Erro ao remover API Key.");
            console.error("Erro na requisição:", err.response ? err.response.data : err);
        }
    };

    const handleAddKey = async () => {
        try {
            const response = await axios.post(
                "http://192.168.1.15:8081/api/auth/api-key",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Atualiza a lista de API Keys com a nova chave
            setApiKeys([...apiKeys, { key: response.data }]);
            setError("");
        } catch (err) {
            setError("Erro ao criar API Key.");
            console.error("Erro na requisição:", err.response ? err.response.data : err);
        }
    };

    // Função para fazer logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    // Busca as API Keys ao carregar o componente
    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchApiKeys();
        }
    }, [token, navigate]);

    return (
        <div className="container-fluid">
            {/* Header */}
            <header className="bg-dark text-white p-3">
                <div className="container">
                    <h1>API Keys Management</h1>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <div className="container mt-4">
                <div className="row">
                    {/* Menu Lateral */}
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Menu</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Opção 1</li>
                                    <li className="list-group-item">Opção 2</li>
                                    <li className="list-group-item">Opção 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Lista de API Keys */}
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">API Keys</h4>
                                <p className="card-text">
                                    Please note that changes can take some time to reflect throughout our caching infrastructure.
                                </p>

                                {/* Lista de API Keys */}
                                {apiKeys.map((apiKey) => (
                                    <div key={apiKey.key} className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="api-key-value">{apiKey.key}</span>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveKey(apiKey.key)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}

                                {/* Botão para Adicionar Nova API Key */}
                                <button className="btn btn-primary w-100 mt-3" onClick={handleAddKey}>
                                    Add New API Key
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white p-3 mt-4">
                <div className="container">
                    <p className="text-center mb-0">© 2023 API Keys Management. All rights reserved.</p>
                </div>
            </footer>

            {/* Botão de Logout */}
            <div className="container mt-4">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ApiKeys;