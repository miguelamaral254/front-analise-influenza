"use client"; 
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login } from "@/features/auth/signin/auth.service";
import { LoginRequest } from "@/features/auth/signin/login.interface";
import { jwtDecode } from "jwt-decode";

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
  resetAuth: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        setUser({
          email: decodedToken.sub,
          role: decodedToken.role,
          id: decodedToken.id,
          sub: decodedToken.sub,
        });
      } catch (error) {
        console.error("Erro ao decodificar token", error);
        setUser(null);
      }
    }
  }, []);

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