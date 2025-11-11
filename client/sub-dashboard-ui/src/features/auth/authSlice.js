import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  user: user || null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await authService.login(data);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.error || "Login failed"
    );
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Registration failed"
      );
    }
  }
);

export const refreshTokens = createAsyncThunk(
  "auth/refresh",
  async (token, thunkAPI) => {
    try {
      return await authService.refresh(token);
    } catch {
      thunkAPI.dispatch(logout());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { data, tokens } = action.payload;
        state.user = data;
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      })
      .addCase(register.fulfilled, (state, action) => {
        const { data, tokens } = action.payload;
        state.user = data;
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
