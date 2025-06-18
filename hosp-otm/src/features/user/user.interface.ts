export enum Role {
  ROLE_ADMIN = "ADMIN",
  ROLE_RESEARCHER = "RESEARCHER",
  ROLE_USER = "USER"
}

export interface User {
  id?: number;
  imageUrl?: string;
  name?: string;
  role?: Role;
  email?: string;
  password?: string;
  enabled?: boolean;
  cpf?: string;
  number?: string; // O número de telefone está diretamente na entidade User
  countryCode?: string; // O código do país também está diretamente na entidade User
  createdDate?: string;
  lastModifiedDate?: string;
}