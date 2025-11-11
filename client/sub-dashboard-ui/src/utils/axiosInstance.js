import axios from "axios";
import store from "../app/store";
import { setTokens, logout } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const API = "http://localhost:4000/api";

const axiosInstance = axios.create({ baseURL: API });

// Intercept requests to refresh token if expired
axiosInstance.interceptors.request.use(async (config) => {
  const state = store.getState().auth;
  const token = state.accessToken;
  const refreshToken = state.refreshToken;

  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      try {
        const res = await axios.post(`${API}/auth/refresh`, { refreshToken });
        store.dispatch(setTokens(res.data));
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      } catch {
        store.dispatch(logout());
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
