import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getTrackerDataOfUser = createAsyncThunk(
  "tracker/getDataOfUser",
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

export const addLeetcode = createAsyncThunk(
  "tracker/addLeetcode",
  async({leetcodeUsername},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const updateLeetcode = await axiosInstance.post("/Tracker/addLeetcode",{
          leetcodeUsername
        },{
        headers:{
          Authorization: `Bearer ${token}`
        },
      })
      return updateLeetcode.data;
    } catch (error) {
        return rejectWithValue(
        error.response?.data?.message || "Failed to Add Leetcode"
      );
    }
  }
)

export const addGitHub = createAsyncThunk(
  "tracker/addGitHub",
  async({githubUsername},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const updateGithub = await axiosInstance.post("/Tracker/addGithub",{
        githubUsername
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return updateGithub.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Add GitHub"
      );
    }
  }
)

export const addSkill = createAsyncThunk(
  "tracker/addSkill",
  async({skill},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const addedSkill = await axiosInstance.patch("/Tracker/addSkill",{
        skill
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return addedSkill.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Add Skill"
      );
    }
  }
)

export const removeSkill = createAsyncThunk(
  "tracker/removeSkill",
  async({skill},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const updateSkill = await axiosInstance.patch("/Tracker/removeSkill",{
        skill
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return updateSkill.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove Skill"
      );
    }
  }
)

export const addProject = createAsyncThunk(
  "tracker/addProject",
  async({project},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const updateProject = await axiosInstance.patch("/Tracker/addProject",{
        project
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return updateProject.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add Project"
      );
    }
  }
)

export const removeProject = createAsyncThunk(
  "tracker/removeProject",
  async({projectId},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const updateProject = await axiosInstance.patch(`/Tracker/removeProject?projectId=${projectId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return updateProject.data
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove Project"
      );
    }
  }
)

const initialState={
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
      name:"",
      past5: [0, 0, 0, 0, 0],
      github: {
        prs: 0,
        contributions: 0,
        repos: 0,
        url:"",
        username:""
      },
      skills: [],
      projects: [],
    },
    loading:false,
    error:null
  }

const TrackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers:{
    refreshTracker:()=>initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrackerDataOfUser.pending,(state)=>{
        state.loading=true,
        state.error=null
      })
      .addCase(getTrackerDataOfUser.fulfilled,(state,action)=>{
           const data = action.payload;
        state.data={
            leetcode: {
                solvedProblems: data.tracker.leetcode.solvedProblems,
                easy: data.tracker.leetcode.easy,
                medium: data.tracker.leetcode.medium,
                hard: data.tracker.leetcode.hard,
                url: data.tracker.leetcode.url,
                username: data.tracker.leetcode.username
            },
            rank: data.tracker.rank,
            dsaLanguage: data.domain_dsa,
            past5: data.tracker.past5,
            name:data.name,
            github: {
                prs: data.tracker.github.prs,
                contributions: data.tracker.github.contributions,
                repos: data.tracker.github.repos,
                url:data.tracker.github.url,
                username:data.tracker.github.username
            },
            skills: data.tracker.skills,
            projects: data.tracker.projects,
        },
        state.loading=false
      })
      .addCase(getTrackerDataOfUser.rejected,(state, action)=>{
        state.loading=false,
        state.error=action.payload
      })
      .addCase(addLeetcode.pending, (state)=>{
        state.loading=true,
        state.error=null
      })
      .addCase(addLeetcode.fulfilled,(state, action)=>{
        state.loading= false
        const data = action.payload;
        state.data.leetcode = {
            solvedProblems: data.leetcode.solvedProblems,
            easy: data.leetcode.easy,
            medium: data.leetcode.medium,
            hard: data.leetcode.hard,
            url: data.leetcode.url,
            username:data.leetcode.username
        }
        state.data.past5 = data.past5
      })
      .addCase(addLeetcode.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
      })
      .addCase(addGitHub.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addGitHub.fulfilled, (state, action)=>{
        state.loading=false
        const data=action.payload
        state.data.github = {
            prs: data.prs,
            contributions: data.contributions,
            repos: data.repos,
        }
      })
      .addCase(addGitHub.rejected, (state,action)=>{
        state.loading=false,
        state.error=action.payload
      })
      .addCase(addSkill.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addSkill.fulfilled, (state, action)=>{
        state.loading=false
        const data=action.payload
        state.data.skills = data.skills
      })
      .addCase(addSkill.rejected, (state,action)=>{
        state.loading=false,
        state.error=action.payload
      })
      .addCase(removeSkill.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(removeSkill.fulfilled, (state, action)=>{
        state.loading=false
        const data=action.payload
        state.data.skills = data.skills
      })
      .addCase(removeSkill.rejected, (state,action)=>{
        state.loading=false,
        state.error=action.payload
      })
      .addCase(addProject.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(addProject.fulfilled, (state, action)=>{
        state.loading=false
        const data=action.payload
        state.data.projects.push(data)
      })
      .addCase(addProject.rejected, (state,action)=>{
        state.loading=false,
        state.error=action.payload
      })
      .addCase(removeProject.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(removeProject.fulfilled, (state, action)=>{
        state.loading=false
        const data=action.payload
        state.data.projects = data
      })
      .addCase(removeProject.rejected, (state,action)=>{
        state.loading=false,
        state.error=action.payload
      })
  },
});

export const {refreshTracker} = TrackerSlice.actions
export default TrackerSlice.reducer;