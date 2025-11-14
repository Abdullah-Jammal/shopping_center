"use client";

import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function logoutAndRedirect(refreshToken?: string) {
  if (refreshToken) {
    try {
      await axios.post(
        `${BASE_URL}Auth/logout`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.warn("Logout request failed", err);
    }
  }

  Cookies.remove("token");
  Cookies.remove("refreshToken");

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
