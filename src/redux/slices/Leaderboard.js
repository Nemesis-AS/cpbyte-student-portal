import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getAll = createAsyncThunk(
  "leaderboard/getAll",
  async ({ _ }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axiosInstance.get("/Tracker/getAll",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Users Data"
      );
    }
  }
);

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAll.pending,(state)=>{
            state.error=null,
            state.loading=true
        })
        .addCase(getAll.fulfilled,(state, action)=>{
            state.users=action.payload,
            state.loading=false
        })
        .addCase(getAll.rejected,(state, action)=>{
            state.error=action.payload,
            state.loading=false
        })
    }
})

export default leaderboardSlice.reducer;
