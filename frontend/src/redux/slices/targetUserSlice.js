import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getTrackerDataOfTargetUser = createAsyncThunk(
  "targetUser/getTrackerDataOfTargetUser",
  async ({ library_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = await axiosInstance.get(
        `/Tracker/getUserTrackerDashboard/${library_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return user.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Access Users Data"
      );
    }
  }
);

const initialState = {
  data: {
    leetcode: {
      solvedProblems: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      url: "",
      username: "",
    },
    rank: 0,
    dsaLanguage: "",
    avatar: "",
    name:"",
    past5: [0, 0, 0, 0, 0],
    github: {
      prs: 0,
      contributions: 0,
      repos: 0,
      url: "",
      username: "",
    },
    skills: [],
    projects: [],
  },
  loading: false,
  error: null,
};

const geTargetUserSlice = createSlice({
  name: "targetUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTrackerDataOfTargetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrackerDataOfTargetUser.fulfilled, (state, action) => {
        const data = action.payload;
        (state.data = {
          leetcode: {
            solvedProblems: data.tracker.leetcode.solvedProblems,
            easy: data.tracker.leetcode.easy,
            medium: data.tracker.leetcode.medium,
            hard: data.tracker.leetcode.hard,
            url: data.tracker.leetcode.url,
            username: data.tracker.leetcode.username,
          },
          rank: data.tracker.rank,
          dsaLanguage: data.domain_dsa,
          past5: data.tracker.past5,
          name:data.name,
          avatar:data.avatar,
          github: {
            prs: data.tracker.github.prs,
            contributions: data.tracker.github.contributions,
            repos: data.tracker.github.repos,
            url: data.tracker.github.url,
            username: data.tracker.github.username,
          },
          skills: data.tracker.skills,
          projects: data.tracker.projects,
        }),
          (state.loading = false);
      })
      .addCase(getTrackerDataOfTargetUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loader = false;
      });
  },
});

export default geTargetUserSlice.reducer