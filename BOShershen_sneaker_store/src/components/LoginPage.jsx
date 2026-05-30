import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const { login, register, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const success = isRegistering ? register(name.trim()) : login(name.trim());

    if (success) {
      navigate("/");
    } else {
      setError(
        isRegistering ? "Користувач уже існує." : "Користувача не знайдено."
      );
    }
  };

  return (
    <div className="login container">
      <h2>{isRegistering ? "Register" : "Log In"}</h2>
      <input
        type="text"
        placeholder="User name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="logRegBtn" onClick={handleSubmit}>
        {isRegistering ? "Register" : "Log In"}
      </button>
      <button
        className="logRegBtn"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setError("");
        }}
      >
        {isRegistering ? "Already have an account?" : "Create new account"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      Admin name for testing: Oleksandr
    </div>
  );
};

export default LoginPage;
