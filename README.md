


# 🦠 Influenza Dashboard

Sistema de visualização interativa de dados de saúde pública com foco em **internações por Influenza** e **capacidade hospitalar (leitos SUS e Não SUS)** no Brasil. Desenvolvido com **Next.js + TypeScript**, o projeto permite análise exploratória por estado, ano e mês, além de gerar **alertas preditivos de sobrecarga hospitalar**.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** – Framework React com renderização híbrida
- **TypeScript** – Tipagem estática para maior segurança
- **React Chart.js 2** + **Chart.js** – Visualização de dados em gráficos interativos
- **Axios** – Requisições HTTP para APIs de dados
- **ESLint + Prettier** – Lint e formatação padronizada
- **Modularização com `/src` + `@/`** – Organização de código por domínio

---

## 📁 Estrutura das Rotas

- `/login` – Tela de autenticação (proteção de acesso)
- `/dashboard` – Área principal com os dashboards interativos:

### Dashboards disponíveis:

#### 📌 1. Internações por Influenza
- Visualização mensal e anual
- Filtros por UF (estado), ano e mês
- Gráficos de barra comparando meses ou estados

#### 📌 2. Leitos SUS e Não SUS
- Distribuição por estado e ano
- Gráficos de capacidade instalada

#### 📌 3. Comparativo de Picos de Internações
- Identificação automática do mês de pico por UF
- Análise sazonal da doença

#### 📌 4. Alertas de Sobrecarga (Projeção)
- Identifica estados com risco de colapso hospitalar
- Baseado na proporção de internações por Influenza vs. leitos disponíveis

---

## 🧪 Funcionalidades Técnicas

- Gráficos dinâmicos com `react-chartjs-2`
- Filtros controlados via `useState`
- Requisições assíncronas com `axios`
- Modularização de serviços:
  - `influenza.service.ts`
  - `leitos.service.ts`

---

## 🔧 Como Rodar o Projeto

### Requisitos

- Node.js `>= 18`
- npm ou yarn

### Passos

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/influenza-dashboard.git
cd influenza-dashboard

# Instalar dependências
npm install

# Rodar o projeto em modo de desenvolvimento
npm run dev
````

Abra `http://localhost:3000/dashboard` no navegador para acessar os dashboards.

---

## 🛠️ Configuração TypeScript

A configuração `tsconfig.json` está ajustada para:

* **Resolução de paths com `@/`** para facilitar imports
* **Módulo ESNext** e resolução via bundler
* **JSX preservado** para integração com Next.js
* **Strict mode** ativado para maior qualidade de código

---

## 🛡️ Autenticação

A autenticação é gerenciada pela rota `/login`. Essa camada protege o acesso aos dashboards em `/dashboard`.

---

## 📈 Exemplo de Código

```tsx
const filteredData = influenzaData.filter((item) =>
  (selectedState ? item.uf === selectedState : true) && item.ano === selectedYear
);

const chartData = {
  labels: filteredData.map((item) => item.uf),
  datasets: selectedMonth === "all"
    ? months.map((month) => ({
        label: `${month.toUpperCase()} (${selectedYear})`,
        data: filteredData.map((item) => item[month]),
        ...
    }))
    : [{
        label: `${selectedMonth.toUpperCase()} (${selectedYear})`,
        data: filteredData.map((item) => item[selectedMonth]),
        ...
    }]
};
```

---

## 🌐 Deploy

O projeto pode ser facilmente publicado no [Vercel](https://vercel.com/):

```bash
vercel
```

---


## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---
