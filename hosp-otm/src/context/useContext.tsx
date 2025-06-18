"use client"; 
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login } from "@/features/auth/signin/auth.service";
import { LoginRequest } from "@/features/auth/signin/login.interface";
import { jwtDecode } from "jwt-decode";

// Definição do payload do JWT
interface JwtPayload {
  email: string;
  role: string;
  id: number;  
  sub: string;
}

interface AuthContextData {
  user: JwtPayload | null;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  resetAuth: () => void;  // Adicionando resetAuth
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const useAuthToken = (): JwtPayload | null => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        setUser({
          email: decodedToken.sub,
          role: decodedToken.role,
          id: decodedToken.id,  // Usando id diretamente como no token
          sub: decodedToken.sub,
        });
      } catch (error) {
        console.error("Erro ao decodificar token", error);
        setUser(null);
      }
    }
  }, []);

  return user;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  const userFromToken = useAuthToken(); 

  useEffect(() => {
    if (userFromToken) {
      setUser(userFromToken);
    }
  }, [userFromToken]);

  const loginUser = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials);
      const { token } = response;

      localStorage.setItem("token", token);

      const decodedToken: JwtPayload = jwtDecode(token);
      setUser({
        email: decodedToken.sub,
        role: decodedToken.role,
        id: decodedToken.id,
        sub: decodedToken.sub,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao tentar realizar login");
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Função para resetar a autenticação (limpando o estado e o token)
  const resetAuth = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};