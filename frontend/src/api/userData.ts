import axios from "axios";
import { API_URL } from "@/config/api";

// 🔹 Ambil data transaksi berdasarkan nomor rekening
export const getTransaksiByNomorRekening = async (nomorRekening: number) => {
  const response = await axios.get(`${API_URL}transaksi/${nomorRekening}`);
  return response.data; // tampilkan data mentah langsung
};

// 🔹 Ambil data bulanan berdasarkan nomor rekening
export const getDataBulananByNomorRekening = async (nomorRekening: number) => {
  const response = await axios.get(`${API_URL}data-bulanan/${nomorRekening}`);
  return response.data; // tampilkan data mentah langsung
};

// 🔹 Ambil data KYC berdasarkan NIK
export const getKYCByNIK = async (nik: number) => {
  const response = await axios.get(`${API_URL}kyc/${nik}`);
  return response.data; // tampilkan data mentah langsung
};
