import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/users");
      return res.data.data; // Array of users
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

// EDIT USER PROFILE
export const editUserProfile = createAsyncThunk(
  "admin/editUserProfile",
  async ({ libId, data }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(token)
    try {
        const res = await axiosInstance.post(
            "/admin/editUserProfile",
            { libId, data },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       console.log(res.data)
      return res.data; // { success, message, data }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (libId, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token"); // or wherever you're storing the JWT
  
        const res = await axiosInstance.delete("/admin/deleteUser", {
          data: { libId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return res.data; // { success, message, data }
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to delete user");
      }
    }
  );
  
export const getAllCoordinators = createAsyncThunk(
    "admin/getAllCoordinators",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/coordinators");
      return res.data.data; // Array of users
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
  );
  
  // Fetch Leads
  export const getAllLeads = createAsyncThunk(
    "admin/getAllLeads",
    async (_, thunkAPI) => {
      try {
        const res = await axiosInstance.get("admin/leads");
        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch leads");
      }
    }
  );

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    coordinators: [],
    leads: [],
    loading: false,
    error: null,
    successMessage: null,
    updatedUser: null,
    deletedUser: null,
  },
  reducers: {
    clearAdminMessages: (state) => {
      state.successMessage = null;
      state.error = null;
      state.updatedUser = null;
      state.deletedUser = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Edit User
    builder
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.updatedUser = action.payload.data;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.deletedUser = action.payload.data;
        // Optionally remove from users list
        state.users = state.users.filter(user => user.library_id !== action.payload.data.library_id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      // Coordinators
      .addCase(getAllCoordinators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoordinators.fulfilled, (state, action) => {
        state.loading = false;
        state.coordinators = action.payload;
      })
      .addCase(getAllCoordinators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    builder

      // Leads
      .addCase(getAllLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(getAllLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminMessages } = adminSlice.actions;

export default adminSlice.reducer;
