import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth/me", { withCredentials: true });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      // err.response?.data?.message ||
      "Failed to load user"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.user = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMe.pending, (state) => {
  //       state.status = "loading";
  //       state.error = null;
  //     })
  //     .addCase(fetchMe.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.user = action.payload;
  //     })
  //     .addCase(fetchMe.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.payload || "Failed to load user";
  //       state.user = null;
  //     });
  // },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
