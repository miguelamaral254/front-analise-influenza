/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/core/api";


export const searchInfluenza = async (page: number = 0, size: number = 40): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  try {
    const response = await api.get(`/influenza-nordeste?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Resposta da API:", response);  // Verifique a estrutura da resposta
    return response.data;  // Retorne a resposta inteira para verificar
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error;  // Reenvie o erro
  }
};