import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  colors,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { checkStatus } from "../redux/slices/checkStatus";

function MarkAttendanceProtector({ setIsMarked }) {
  const { data } = useSelector((state) => state.checkStatus);
  const [domain, setDomain] = useState("");
  let DSA = null;
  const [rawDate, setRawDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dashboard.data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain || !rawDate) {
      alert("Please fill all the fields");
      return;
    }
    if (domain === user?.domain_dsa) {
      DSA = true;
    } else {
      DSA = false;
    }
    const date = new Date(rawDate + "T00:00:00.000Z");
    dispatch(checkStatus({ domain, date, DSA }));

  };
  useEffect(() => {
    if (data === null) {
      setIsMarked(0);
    }
    else if (data.marked) {
      setIsMarked(2);

    } else if (!data.marked) {
      setIsMarked(1);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 text-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Mark Attendance
          </h2>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                color: "white",
              },
            }}
          >
            <InputLabel
              id="domain_label"
              sx={{
                color: colors.grey[100],
                "&.Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            >
              Select Domain
            </InputLabel>
            <Select
              labelId="domain_label"
              id="domain"
              label="Domain"
              value={domain}
              required
              onChange={(e) => setDomain(e.target.value)}
              className="bg-gray-700 text-gray-300"
              sx={{
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "28px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#374254",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value={user?.domain_dsa}>{user?.domain_dsa}</MenuItem>
              <MenuItem value={user?.domain_dev}>{user?.domain_dev}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            type="text"
            label="Date"
            variant="outlined"
            value={rawDate}
            InputProps={{
              readOnly: true,
              style: { color: "white" },
            }}
            fullWidth
            className="bg-gray-700 rounded-lg"
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className=" font-semibold"
            sx={{
              backgroundColor: "#0ec1e7",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#0daed1",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MarkAttendanceProtector;
