import {configureStore} from '@reduxjs/toolkit';
import dashboardSlice from './slices/profileSlice';
import AttendanceSlice from './slices/getDomainUserSlice';
import authSlice from './slices/authSlice';
import eventSlice from './slices/eventSlice';
import markAttendance from './slices/attendanceSlice';
import SettingsSlice from './slices/settingsSlice'
import checkStatusSlice from './slices/checkStatus';
import TrackerSlice from './slices/TrackerSlice'
import leaderboardSlice from './slices/Leaderboard'
import getTargetUserSlice from './slices/targetUserSlice'

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    attendance: AttendanceSlice,
    authSlice: authSlice,
    event:eventSlice,
    markAttendance:markAttendance,
    settings:SettingsSlice,
    checkStatus: checkStatusSlice,
    tracker:TrackerSlice,
    leaderboard:leaderboardSlice,
    targetUser:getTargetUserSlice
  },
})

export default store;