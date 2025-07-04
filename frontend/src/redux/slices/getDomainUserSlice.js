import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getMembersOfDomain = createAsyncThunk(
    "attendance/getMembersOfDomain",
    async ({ domain, domainType }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/coordinator/memberOfDomain", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            domain: domain,
          },
        });
  
        return {
          domainType,
          members: res.data.data,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch members");
      }
    }
  );

  const initialState={
    data:{},
    loading:true,
    error:null
}
const AttendanceSlice = createSlice({
    name:"attendance",
    initialState,
    reducers:{
      refreshAttendance:()=>initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(getMembersOfDomain.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getMembersOfDomain.fulfilled, (state, action) => {
            state.loading = false;
            const { domainType, members } = action.payload;
            state.data[domainType] = members;
          })
          .addCase(getMembersOfDomain.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
})

export const {refreshAttendance} = AttendanceSlice.actions
export default AttendanceSlice.reducer;