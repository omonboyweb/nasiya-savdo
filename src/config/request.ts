import axios, { AxiosError } from "axios";
import { getStorage } from "../store/local-storage";
import type { InternalAxiosRequestConfig } from "axios";
import type { AxiosRequestHeaders } from "axios";
export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  timeout: 10000,
});

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = getStorage("access_token");

    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);
