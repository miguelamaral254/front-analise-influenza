"use client"; 
import React, { useEffect } from "react";
import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";
import InfluenzaDashboard from "@/features/influenza/InfluenzaDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("Logado")
    }
  }, [user, router]);

  if (!user) {
    return null;
  }


  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", textAlign: "center", marginBottom: "32px" }}>
        Dashboard
      </h1>

      <InfluenzaDashboard /> {/* Chamando o componente InfluenzaDashboard aqui */}
    </div>
  );
};

export default Dashboard;