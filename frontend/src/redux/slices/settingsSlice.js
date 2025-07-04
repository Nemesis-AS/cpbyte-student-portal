import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../lib/axios";

export const updatePass = createAsyncThunk(
    "settings/editPass",
    async({oldPass, newPass, confPass},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            await axiosInstance.post("/settings/editPass",{
                oldPass,
                newPass,
                confPass
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            })
        } catch (error) {
            return rejectWithValue(err.response?.data?.message || "Password update failed");
        }
    }
)

export const updateAvatar = createAsyncThunk(
    "settings/updateAvatar",
    async({image}, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            await axiosInstance.post("/settings/editAvatar",{
                    image
                  },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  })
        } catch (error) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
)

const SettingsSlice=createSlice({
    name:"settings",
    initialState:{
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(updatePass.pending,(state)=>{
                state.loading=true
            })
            .addCase(updatePass.fulfilled,(state)=>{
                state.loading=false
            })
            .addCase(updatePass.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })
    }
})

export default SettingsSlice.reducer