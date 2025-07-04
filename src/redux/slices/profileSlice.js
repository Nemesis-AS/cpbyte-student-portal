import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios";

export const userProfile = createAsyncThunk(
    "dashboard/getProfile",
    async(_, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get("/user/getProfile", { 
                headers:{
                    Authorization: `Bearer ${token}`
                }
             });             
            return res.data.data;
          } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
          }
    }
)

const initialState={
    data: null,
    loading: false,
    error: null,
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        refreshDash:()=>initialState
    },
    extraReducers:(builder)=>{
        builder
            .addCase(userProfile.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(userProfile.fulfilled,(state, action)=>{                
                state.loading=false;
                state.data=action.payload
            })
            .addCase(userProfile.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
    }
})

export const {refreshDash} = dashboardSlice.actions
export default dashboardSlice.reducer;