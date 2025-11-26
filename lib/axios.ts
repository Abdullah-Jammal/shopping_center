"use client";

import { logoutAndRedirect } from "@/app/(auth)/login/api/logout";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        return logoutAndRedirect(refreshToken);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/Auth/refresh-token`,
          { refreshToken },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccessToken = data.token;
        const newRefreshToken = data.refreshToken;

        Cookies.set("token", newAccessToken);
        Cookies.set("refreshToken", newRefreshToken);

        failedRequestsQueue.forEach((req) => req.resolve(newAccessToken));
        failedRequestsQueue = [];

        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        failedRequestsQueue.forEach((req) => req.reject(err));
        failedRequestsQueue = [];
        isRefreshing = false;

        return logoutAndRedirect(refreshToken);
      }
    }
    return Promise.reject(error);
  }
);
