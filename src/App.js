import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ApiKeys from "./components/ApiKeys";

const App = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/api-keys" />
                        ) : (
                            <Login setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/api-keys" />
                        ) : (
                            <Register setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                />
                <Route
                    path="/api-keys"
                    element={
                        isLoggedIn ? (
                            <ApiKeys setIsLoggedIn={setIsLoggedIn} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;