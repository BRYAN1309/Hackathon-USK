import axios from "axios";
import { API_URL } from "@/config/api";

export const registerUMKM = async (formData: FormData) => {
  // formData is already properly constructed from the component
  // Just pass it directly to the API
  
  const res = await axios.post(`${API_URL}/umkm/register`, formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};