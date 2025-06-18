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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "400px", width: "100%", padding: "2rem", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "24px", fontWeight: "600" }}>Login</h2>

        {error && <div style={{ marginBottom: "1rem", color: "#dc2626", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #d1d5db", fontSize: "14px" }}
              placeholder="Digite seu Email"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "14px", fontWeight: "500" }}>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #d1d5db", fontSize: "14px" }}
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