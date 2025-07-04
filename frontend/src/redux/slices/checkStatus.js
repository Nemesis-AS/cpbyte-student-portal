import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const checkStatus = createAsyncThunk(
  "checkStatus/checkStatus",
  async ({domain, date, DSA}, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post("/coordinator/checkStatus",{
            domain: domain,
            date: date
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      return ({data:response.data, DSA});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "checkStatus/updateStatus",
  async ({ domain, date }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/coordinator/updateStatus",
        {
          domain: domain,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkStatusSlice = createSlice({
  name: "checkStatus",
  initialState: {
    data: null,
    subject: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetCheckStatus: (state) => {
      state.data = null;
      state.subject = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.loading = false;
        const {data, DSA} = action.payload;
        state.data = data;
        state.subject = DSA;
      })
      .addCase(checkStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {marked: true};
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetCheckStatus} = checkStatusSlice.actions
export default checkStatusSlice.reducer;