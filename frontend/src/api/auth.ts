// src/api/auth.ts
import axios from "axios";
import { LoginResponse } from "../types/user";
import { API_URL } from "../config/api";

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login gagal");
    }
    throw new Error("Terjadi kesalahan saat menghubungi server");
  }
};
