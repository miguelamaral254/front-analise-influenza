import api from "@/core/api";
import { User } from "@/features/user/user.interface";

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<{ data: User }>(`/users/${id}`);
  return response.data.data; // Acessa o data interno
};