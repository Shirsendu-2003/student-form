import axios from "axios";

const api = axios.create({
  baseURL: "https://studentforn-backend-1.onrender.com/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Auto attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto retry ONLY on CORS / Network errors
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!err.response && !err.config._retry) {
      err.config._retry = true;
      return api(err.config);
    }
    return Promise.reject(err);
  }
);

export default api;
