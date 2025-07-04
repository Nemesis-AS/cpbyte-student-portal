import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ library_id, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", { library_id, password });
      localStorage.setItem("token", res.data.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get("/auth/logout",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        return res.data;
        } catch (error) {
            return rejectWithValue(err.response?.data?.message || "Logout failed");
        }
    }
)

const initialState= {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    authRefresh:()=>initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state)=>{
        state.error=null;
        state.loading=true;
      })
      .addCase(logoutUser.fulfilled,(state)=>{
        state.user=null;
        state.token=null;
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.error=action.payload;
        state.loading=false;
      })
  },
});

export const {authRefresh} = authSlice.actions
export default authSlice.reducer;