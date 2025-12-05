"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { logoutAndRedirect } from "@/app/(auth)/login/api/logout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("❌ Interceptor caught error:", error.config?.url);
    console.log("Status:", error.response?.status);

    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        logoutAndRedirect();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/Auth/refresh-token`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newToken = data.token;
        const newRefreshToken = data.refreshToken;

        Cookies.set("token", newToken);
        Cookies.set("refreshToken", newRefreshToken);
        Cookies.set("expiresAt", data.expiresAt);
        Cookies.set("refreshTokenExpiresAt", data.refreshTokenExpiresAt);
        Cookies.set("sessionExpiresAt", data.sessionExpiresAt);

        processQueue(null, newToken);

        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        logoutAndRedirect();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
