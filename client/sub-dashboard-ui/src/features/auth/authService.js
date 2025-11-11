import axios from "axios";

const API = "http://localhost:4000/api";

const register = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};

const login = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};

const refresh = async (refreshToken) => {
  const res = await axios.post(`${API}/auth/refresh`, { refreshToken });
  return res.data;
};

export default { register, login, refresh };
