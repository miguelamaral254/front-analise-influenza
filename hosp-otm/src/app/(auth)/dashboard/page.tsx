"use client"; 
import React, { useEffect } from "react";
import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import InfluenzaDashboard from "@/features/influenza/InfluenzaDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "User Engagement",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Growth",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 205, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 205, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", textAlign: "center", marginBottom: "32px" }}>
        Dashboard
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>User Engagement (Bar Chart)</h2>
          <Bar data={barChartData} />
        </div>

        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Sales Growth (Line Chart)</h2>
          <Line data={lineChartData} />
        </div>

        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Color Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      <InfluenzaDashboard /> {/* Chamando o componente InfluenzaDashboard aqui */}
    </div>
  );
};

export default Dashboard;