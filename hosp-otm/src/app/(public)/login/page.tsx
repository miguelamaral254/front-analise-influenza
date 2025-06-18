"use client"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Corrigido para "next/navigation"
import { LoginRequest } from "@/features/auth/signin/login.interface"; // Importando a interface LoginRequest
import { useAuth } from "@/context/useContext";

// Marca o componente como cliente


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { loginUser } = useAuth(); // Usando o contexto para login
  const router = useRouter(); // Hook de navegação do Next.js

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginRequest = {
      email,
      password,
    };

    try {
      await loginUser(credentials); // Chama a função do contexto de autenticação
      router.push("/dashboard"); // Redireciona para a página "dashboard" após login bem-sucedido
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Exibe a mensagem de erro no estado
      } else {
        setError("Erro desconhecido, tente novamente.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;