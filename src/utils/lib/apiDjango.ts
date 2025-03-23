import axios from "axios";

const apiDjango = axios.create({
  baseURL: process.env.API_BASE_URL_DJANGO,
  withCredentials: true,
});

export default apiDjango;
