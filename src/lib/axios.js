import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cpbyte-student-portal.onrender.com/api/v1",
  withCredentials: true,
});