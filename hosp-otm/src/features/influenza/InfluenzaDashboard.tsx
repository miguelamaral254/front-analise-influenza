/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { searchInfluenza } from "./influenza.service";
import LeitosDashboard from "../auth/leitos/LeitosDashboard";
import OverloadRisk from "./OverloadRisk"; // Importe o componente OverloadRisk
import { searchLeitosSusNaoSUS } from "../auth/leitos/leitos.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InfluenzaDashboard: React.FC = () => {
  const [influenzaData, setInfluenzaData] = useState<any[]>([]);
  const [leitosData, setLeitosData] = useState<any[]>([]); 
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const influenzaResponse = await searchInfluenza();
        if (influenzaResponse && influenzaResponse.data && influenzaResponse.data.content) {
          setInfluenzaData(influenzaResponse.data.content);
        }

        const leitosResponse = await searchLeitosSusNaoSUS(); 
        if (leitosResponse && leitosResponse.data && leitosResponse.data.content) {
          setLeitosData(leitosResponse.data.content);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };

    fetchData();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const filteredData = influenzaData.filter((item) =>
    (selectedState ? item.uf === selectedState : true) && item.ano === selectedYear
  );

  const months = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const chartData = {
    labels: filteredData.map((item) => item.uf),
    datasets: selectedMonth === "all"
      ? months.map((month) => ({
          label: `${month.toUpperCase()} (${selectedYear})`,
          data: filteredData.map((item) => item[month]),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1,
        }))
      : [
          {
            label: `${selectedMonth.toUpperCase()} (${selectedYear})`,
            data: filteredData.map((item) => item[selectedMonth]),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
          },
      ],
  };

  const chartTitle = selectedMonth === "all" 
    ? `Internações por Influenza por mês para ${selectedYear}` 
    : `Internações por Influenza em ${selectedMonth.toUpperCase()} (${selectedYear})`;

  const peakData = filteredData.map((item) => {
    const monthlyData = months.map((month) => item[month] || 0);
    const maxPeak = Math.max(...monthlyData);
    const peakMonthIndex = monthlyData.indexOf(maxPeak);
    const peakMonth = months[peakMonthIndex];
    return {
      uf: item.uf,
      peak: maxPeak,
      peakMonth,
    };
  });

  const peakChartData = {
    labels: peakData.map((item) => `${item.uf} (${item.peakMonth.toUpperCase()})`),
    datasets: [
      {
        label: `Picos de internação em ${selectedYear}`,
        data: peakData.map((item) => item.peak),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1,
      },
    ],
    options: {
      indexAxis: 'y',  // Usar barras horizontais
      responsive: true,
    },
  };

  const chartTitleForPeak = `Picos de Internação por Sazonalidade em ${selectedYear}`;

  return (
    <div style={{ padding: "4px", width:"100%",margin: "0 auto" }}>
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
            {[...new Set(influenzaData.map((item) => item.uf))].map((uf) => (
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

        <div style={{ flex: 1 }}>
          <label htmlFor="month-select" style={{ marginRight: "12px", display: "block", fontSize: "16px", fontWeight: "600" }}>
            Mês:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              fontSize: "16px",
            }}
          >
            <option value="all">Todos</option>
            <option value="jan">Janeiro</option>
            <option value="feb">Fevereiro</option>
            <option value="mar">Março</option>
            <option value="apr">Abril</option>
            <option value="may">Maio</option>
            <option value="jun">Junho</option>
            <option value="jul">Julho</option>
            <option value="aug">Agosto</option>
            <option value="sep">Setembro</option>
            <option value="oct">Outubro</option>
            <option value="nov">Novembro</option>
            <option value="dec">Dezembro</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
        <div style={{ flex: 2 }}>
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
          <div style={{ marginTop: "24px" }}>
        <OverloadRisk
          influenzaData={influenzaData}
          leitosData={leitosData}
          selectedState={selectedState}
          selectedYear={selectedYear}
        />
      </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                maxWidth:"600px"
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
                {chartTitleForPeak}
              </h2>
              <Bar data={peakChartData} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <LeitosDashboard selectedState={selectedState} selectedYear={selectedYear} />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default InfluenzaDashboard;