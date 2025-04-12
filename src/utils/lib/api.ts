import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL_GO || "http://localhost:8080/api/",
  withCredentials: true,
});
export default api;
