import axios from "axios";

const api = axios.create({
  baseURL: "https://studentforn-backend-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: Auto attach token if logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
