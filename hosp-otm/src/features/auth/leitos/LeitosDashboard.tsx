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

const LeitosDashboard: React.FC = () => {
  const [leitosData, setLeitosData] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2020);

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
  
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

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
      <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="state-select" style={{ marginRight: "12px", display: "block", fontSize: "16px", fontWeight: "600" }}>
            Estado (UF):
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              fontSize: "16px",
            }}
          >
            <option value="">Todos</option>
            {[...new Set(leitosData.map((item) => item.uf))].map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="year-select" style={{ marginRight: "12px", display: "block", fontSize: "16px", fontWeight: "600" }}>
            Ano:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              fontSize: "16px",
            }}
          >
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </div>
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
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
          {chartTitle}
        </h2>
        {filteredData.length > 0 ? <Bar data={chartData} /> : <p>No data available for selected filters</p>}
      </div>
    </div>
  );
};

export default LeitosDashboard;