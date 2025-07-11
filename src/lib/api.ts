// lib/api.ts
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://nex-be-dev.onrender.com/", // Update with your actual API base URL
  // Update with your actual API base URL
});

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      // 1) Get token from localStorage
      const token = localStorage.getItem("nex_token");
      // 2) If it exists, attach to Authorization header
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default api;
