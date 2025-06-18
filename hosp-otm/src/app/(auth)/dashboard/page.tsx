"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";
import InfluenzaDashboard from "@/features/influenza/InfluenzaDashboard";
import LeitosDashboard from "@/features/auth/leitos/LeitosDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("influenzaDashboard");

  useEffect(() => {
    if (!user) {
      console.log("Logado");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "150px",
          backgroundColor: "#f0f4f8",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          borderRight: "1px solid #e2e8f0",
          height: "100%",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Menu</h3>
        <button
          onClick={() => handleTabClick("influenzaDashboard")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: activeTab === "influenzaDashboard" ? "#4CAF50" : "#ddd",
            color: "#fff",
            border: "none",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Dashboard Influenza
        </button>
        <button
          onClick={() => handleTabClick("leitosDashboard")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: activeTab === "leitosDashboard" ? "#4CAF50" : "#ddd",
            color: "#fff",
            border: "none",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Leitos
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#fff",
          height: "110%",
          overflow: "hidden",
     
        }}
      >
        {activeTab === "influenzaDashboard" && <InfluenzaDashboard />}
        {activeTab === "leitosDashboard" && <LeitosDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;