import { useAuthStore } from "@/state/authState";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000/api/";

const apiDjango = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiDjango.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refresh_token");

    if (error.response?.status === 401 && refreshToken) {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        const newAccessToken = response.data.access_token;

        Cookies.set("access_token", newAccessToken, {
          expires: 15 / (24 * 60),
          path: "/",
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return (originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiDjango;
