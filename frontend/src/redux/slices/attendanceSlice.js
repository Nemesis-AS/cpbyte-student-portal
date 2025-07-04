import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const markAttendance = createAsyncThunk(
  "markAttendance/markAttendance",
  async ({ subject, responses, date }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/coordinator/markAttendance",
        {
          subject,
          responses,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark attendance"
      );
    }
  }
);

const markAttendanceSlice = createSlice({
  name: "marAttendance",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
        .addCase(markAttendance.pending, (state) => {
            state.loading = true;
        })
        
        .addCase(markAttendance.fulfilled, (state, action)=>{
            state.loading=false,
            state.error=null
        })

        .addCase(markAttendance.rejected,(state, action)=>{
            state.loading=false,
            state.error=action.payload
        })
  },
});

export default markAttendanceSlice.reducer;
