/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { searchLeitosSusNaoSUS } from "./leitos.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LeitosDashboardProps {
  selectedState: string;
  selectedYear: number;
}

const LeitosDashboard: React.FC<LeitosDashboardProps> = ({ selectedState, selectedYear }) => {
  const [leitosData, setLeitosData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeitosData = async () => {
      try {
        const data = await searchLeitosSusNaoSUS();
        if (data && data.data && data.data.content && Array.isArray(data.data.content)) {
          setLeitosData(data.data.content);
        } else {
          console.error("Erro: dados não encontrados ou estrutura inválida.", data);
        }
      } catch (error) {
        console.error("Erro ao carregar dados de Leitos:", error);
      }
    };
  
    fetchLeitosData();
  }, []);
  
  const filteredData = leitosData.filter((item) =>
    (selectedState ? item.uf === selectedState : true) && item.ano === selectedYear
  );

  const chartData = {
    labels: filteredData.map((item) => item.uf),
    datasets: [
      {
        label: `Quantidade de Leitos SUS (${selectedYear})`,
        data: filteredData.map((item) => item.quantidadeSus),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: `Quantidade de Leitos Não SUS (${selectedYear})`,
        data: filteredData.map((item) => item.quantidadeNaoSus),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartTitle = `Leitos SUS e Não SUS (${selectedYear})`;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
          {chartTitle}
        </h2>
        {filteredData.length > 0 ? <Bar data={chartData} /> : <p>No data available for selected filters</p>}
      </div>
    </div>
  );
};

export default LeitosDashboard;