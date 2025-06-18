/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface OverloadRiskProps {
  influenzaData: any[];
  leitosData: any[];
  selectedState: string;
  selectedYear: number;
}

const OverloadRisk: React.FC<OverloadRiskProps> = ({
  influenzaData,
  leitosData,
  selectedState,
  selectedYear,
}) => {
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  const [selectedStateDetails, setSelectedStateDetails] = useState<string>("");

  const filteredInfluenzaData = influenzaData.filter(
    (item) => item.ano === selectedYear && (selectedState ? item.uf === selectedState : true)
  );

  const filteredLeitosData = leitosData.filter(
    (item) => item.ano === selectedYear && (selectedState ? item.uf === selectedState : true)
  );

  const peakData = filteredInfluenzaData.map((item) => {
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

  const overloadRiskData = peakData
    .map((item) => {
      const leitos = filteredLeitosData.find((leito) => leito.uf === item.uf);
      if (leitos) {
        const totalLeitosSus = leitos.quantidadeSus;
        const totalLeitosNaoSus = leitos.quantidadeNaoSus;
        const isOverloaded = item.peak > totalLeitosSus || item.peak > totalLeitosNaoSus;

        return {
          uf: item.uf,
          peakMonth: item.peakMonth,
          peak: item.peak,
          totalLeitosSus,
          totalLeitosNaoSus,
          isOverloaded,
        };
      }
      return null;
    })
    .filter((data) => data !== null);

  const handleStateClick = (uf: string) => {
    // Toggle the state details visibility
    setSelectedStateDetails(uf === selectedStateDetails ? "" : uf);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>
        Risco de Sobrecarga de Leitos em {selectedYear}
      </h2>

      {/* Exibe os estados como botões */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {[...new Set(influenzaData.map((item) => item.uf))].map((uf) => (
          <button
            key={uf}
            onClick={() => handleStateClick(uf)}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: selectedStateDetails === uf ? "#007BFF" : "#f0f0f0",
              color: selectedStateDetails === uf ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {uf}
          </button>
        ))}
      </div>

      {/* Exibe os detalhes do estado selecionado */}
      {overloadRiskData.length > 0 && selectedStateDetails && (
        <div>
          {overloadRiskData
            .filter((data) => data.uf === selectedStateDetails)
            .map((data) => (
              <div
                key={data.uf}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                  {data.uf} - {data.peakMonth.toUpperCase()} ({data.peak} internações)
                </h3>
                <p>
                  Leitos SUS: {data.totalLeitosSus} | Leitos Não SUS: {data.totalLeitosNaoSus}
                </p>
                <p
                  style={{
                    color: data.isOverloaded ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {data.isOverloaded
                    ? "Risco de sobrecarga de leitos!"
                    : "Capacidade de leitos suficiente."}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Caso não haja dados para o filtro selecionado */}
      {overloadRiskData.length === 0 && selectedStateDetails && (
        <p>No data available for selected filters</p>
      )}
    </div>
  );
};

export default OverloadRisk;