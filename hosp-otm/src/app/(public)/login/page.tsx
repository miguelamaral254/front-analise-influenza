"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/features/auth/signin/login.interface";
import { useAuth } from "@/context/useContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginRequest = {
      email,
      password,
    };

    try {
      await loginUser(credentials);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido, tente novamente.");
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Fundo azul à esquerda com círculos e texto centralizado */}
      <div style={{
        flex: 1,
        backgroundColor: "#2563eb",
        position: "relative",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",  // Centraliza o texto
      }}>
        {/* Círculos no fundo */}
        <div style={{
          position: "absolute",
          top: "-100px",
          left: "-150px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}></div>

        {/* Texto no fundo azul */}
        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "1rem" }}>HOPES</h1>
        <h3 style={{ fontSize: "24px", fontWeight: "500", marginBottom: "1.5rem" }}>
          Sistema de Previsão e Otimização de Recursos Hospitalares
        </h3>
        <h4 style={{ fontSize: "20px", fontWeight: "400", color: "#1e3a8a" }}>
          Para casos de gripe influenza no nordeste brasileiro
        </h4>
      </div>

      {/* Formulário de login à direita */}
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "24px", fontWeight: "600" }}>
          Login
        </h2>

        {error && <div style={{ marginBottom: "1rem", color: "#dc2626", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "14px", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
              placeholder="Digite seu Email"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "14px", fontWeight: "500" }}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#2563eb"}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a href="#" style={{ color: "#2563eb", fontSize: "14px", textDecoration: "none" }}>Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;