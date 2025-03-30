import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL_GO,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default api;
