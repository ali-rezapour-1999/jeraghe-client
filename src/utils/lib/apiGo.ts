import axios from "axios";

const API_BASE_URL_GO = "http://localhost:8080/";

const apiGo = axios.create({
  baseURL: API_BASE_URL_GO,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default apiGo;
