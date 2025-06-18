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
      console.log("Logado");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div style={{ display: "flex", height: "100vh", paddingLeft:"25px" }}>
         <InfluenzaDashboard />
      </div>

  );
}

export default Dashboard;