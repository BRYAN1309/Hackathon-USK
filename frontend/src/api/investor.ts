import axios from "axios";
import { API_URL } from "@/config/api";

export interface InvestorLoginResponse {
  message: string;
  data: {
    token: string;
    investor: {
      id: number;
      email: string;
      [key: string]: any; // fleksibel, tergantung data investor
    };
  };
}

export const loginInvestor = async (email: string, password: string) => {
  try {
    const response = await axios.post<InvestorLoginResponse>(
      `${API_URL}/investor/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Terjadi kesalahan saat login");
  }
};
