import axios from "axios";

import { API_URL } from "@/config/api";

export const registerUser = async (form: any) => {
  const data = new FormData();
  data.append("nama", form.nama);
  data.append("email", form.email);
  data.append("password", form.password);
  data.append("nik", form.nik);
  data.append("phone_number", form.phone_number);
  data.append("foto_ktp", form.foto_ktp);

  const res = await axios.post(`${API_URL}/register`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
