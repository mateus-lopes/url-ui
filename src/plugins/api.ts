import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

export default api;