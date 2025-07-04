import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios";

export const getEvents = createAsyncThunk(
    "event/getEvents",
    async({month},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const res = await axiosInstance.get("/schedule/monthEvents", { 
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params:{
                    month:month
                }
                });
            const organizedData = {};

            res.data.forEach(entry => {
            const date = entry.date.slice(0, 10);
            organizedData[date] = entry.events;
            });          
            return ({month,
                events:organizedData});
        } catch (err) {
            console.log(err);
            
            return rejectWithValue(err.response?.data?.message || "Event fetch failed");
        }
    }
)

export const addEvents = createAsyncThunk(
    "event/addEvent",
    async({date, title, category, discription},{rejectWithValue})=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/schedule/addEvent",{
                date,
                title,
                discription,
                category
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            const eventDate = res.data.date.slice(0,10)
            
            return ({month:eventDate.slice(0,7),
                date:eventDate,
                events:res.data.events});
        }
        catch(err){
            return rejectWithValue(err.response?.data?.message || "Event addition failed");
        }
    }
)

export const removeEvents = createAsyncThunk(
    "event/removeEvent",
    async({eventId, eventDate},{rejectWithValue})=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/schedule/removeEvent",{
                eventId
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.data.date){
                return ({month:eventDate.slice(0, 7),
                    date:eventDate,
                    events:res.data.events});
            }

            return ({
                month:eventDate.slice(0,7),
                date:eventDate,
                events:[]
            })
        }
        catch(err){
            return rejectWithValue(err.response?.data?.message || "Event addition failed");
        }
    }
)

const initialState={
    event:{},
    loading:false,
    error:null
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        refreshEvent:()=>initialState
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                const { month, events } = action.payload;
                state.event[month] = events;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEvents.fulfilled, (state, action) => {
                state.loading = false;
                const { month, date, events } = action.payload;
                state.event[month][date] = events;
            })
            .addCase(addEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeEvents.fulfilled, (state, action) => {
                state.loading = false;
                const { month, date, events } = action.payload;
                state.event[month][date] = events;
            })
            .addCase(removeEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {refreshEvent}= eventSlice.actions
export default eventSlice.reducer