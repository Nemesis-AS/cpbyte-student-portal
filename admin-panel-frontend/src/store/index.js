// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice.js";
import adminReducer from "./adminslice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
  },
});

export default store;
