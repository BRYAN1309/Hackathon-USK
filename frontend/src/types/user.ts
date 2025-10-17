// src/types/user.ts
export interface User {
  id: number;
  nama: string;
  email: string;
  nik: number;
  phone_number: number;
  foto_ktp?: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiError {
  status: string;
  message: string;
}
