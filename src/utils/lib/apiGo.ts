import axios from "axios";

const apiGo = axios.create({
  baseURL: process.env.API_BASE_URL_GO,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default apiGo;
