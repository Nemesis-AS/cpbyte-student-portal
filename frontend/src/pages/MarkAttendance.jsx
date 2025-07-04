import React, { useEffect, useState } from "react";
import noimage from "../assets/noImage.webp";
import { useDispatch, useSelector } from "react-redux";
import { markAttendance } from "../redux/slices/attendanceSlice";
import MarkAttendanceProtector from "../componenets/MarkAttendanceProtector";
import { updateStatus } from "../redux/slices/checkStatus";
import { toast } from "react-hot-toast";
import AttendanceAlreadyMarked from "../componenets/AttendanceAlreadyMarked";

const MarkAttendance = () => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const { subject } = useSelector(state => state.checkStatus);
  const [DSA, setDSA] = useState(subject);
  
  const [toggleAll, setToggleAll] = useState(false);
  const [isMarked, setIsMarked] = useState(0);
  const { domain_dev, domain_dsa } = useSelector(state => state.dashboard.data);
  const [permissionRequests, setPermissionRequests] = useState([]);

  const dispatch = useDispatch();

  const handleStatusChange = (library_id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [library_id]: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Marking Attendance...");
    const result = permissionRequests.map((req) => ({
      library_id: req.library_id,
      status: selectedStatus[req.library_id] || "ABSENT_WITHOUT_REASON",
    }));

    const today = new Date().toLocaleDateString('en-CA');
    const date = new Date(today + 'T00:00:00.000Z');
    
    const marked = await dispatch(markAttendance({responses:result, subject: DSA? "DSA" : "DEV", date:date}))
    if (marked.meta.requestStatus === "fulfilled") {
      dispatch(updateStatus({ domain: DSA ? domain_dsa : domain_dev, date: date }));
      setIsMarked(2);
      toast.success("Attendance marked successfully", { id: toastId });
    } else {
      setIsMarked(0);
      toast.error("Failed to mark attendance", { id: toastId });
    }
  };

  const markAllPresent = () => {
    setToggleAll(!toggleAll);
    if (!toggleAll) {
      permissionRequests.map((items) => {
        handleStatusChange(items.library_id, "PRESENT");
      });
    } else {
      setSelectedStatus({});
    }
  };

  const allMembers = useSelector(state => state.attendance.data);
  const { name, role } = useSelector(state => state.dashboard.data);
  
  useEffect(() => {
    setDSA(subject);
    setPermissionRequests(DSA ? allMembers.dsaMembers : allMembers.devMembers);
  }, [DSA, isMarked]);

  if (role !== "COORDINATOR") {
    return (
      <div className="bg-[#070b0f] text-white min-h-screen w-full p-4 md:p-8">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">403</h1>
          <p className="text-base md:text-lg text-gray-300">You are not authorized to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    {isMarked==0 && <MarkAttendanceProtector setIsMarked={setIsMarked}/>}
    {isMarked==1 && (<div className="bg-[#070b0f] text-white min-h-screen w-full p-2 md:p-8 mt">
      <div className="p-2 md:p-4 mt-14 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-8 bg-[#0ec1e7] rounded-full"></div>
            <h1 className="text-xl md:text-3xl font-bold">Mark Member Attendance</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-800 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#212327] rounded-full overflow-hidden">
                <img
                  src={noimage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-medium">{name}</div>
                <div className="text-gray-400">{role}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 mb-6">
            <button className={`bg-[#0ec1e7] px-3 py-2 rounded text-xs md:text-sm font-medium cursor-pointer`}>
              {DSA?domain_dsa:domain_dev} Attendance
            </button>
          </div>
          <h2 className="text-base md:text-lg font-semibold mb-4">{`${permissionRequests?.length} ${DSA ? domain_dsa : domain_dev} Members`}</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex text-xs md:text-sm gap-2 mb-3 md:mb-0">
              <span className="text-zinc-500">Attendance for Date:</span>
              <span>{new Date().toDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="md:ml-4" onChange={markAllPresent} />
              <span className="text-xs md:text-sm text-zinc-300">Mark all present</span>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-xl md:rounded-2xl">
            <form onSubmit={handleSubmit}>
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-[#212327]">
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="py-2 md:py-3 px-2 md:px-4">S No.</th>
                    <th className="py-2 md:py-3 px-2 md:px-4">Member</th>
                    <th className="py-2 md:py-3 px-2 md:px-4">Library ID</th>
                    <th className="py-2 md:py-3 px-2 md:px-4">Attended</th>
                    <th className="py-2 md:py-3 px-2 md:px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionRequests?.map((request, key) => (
                    <tr key={key} className="border-b border-gray-800">
                      <td className="py-2 md:py-4 px-2 md:px-4">{key+1}</td>
                      <td className="py-2 md:py-4 px-2 md:px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-500 rounded-full overflow-hidden">
                            <img
                              src={noimage}
                              alt={request.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[100px] md:max-w-full">{request.name}</span>
                        </div>
                      </td>
                      <td className="py-2 md:py-4 px-2 md:px-4 w-[80px] md:w-[15rem]">
                        {request.library_id}
                      </td>
                      <td className="py-2 md:py-4 px-2 md:px-4 w-[70px] md:w-[13rem]">
                        {request.dsaAttendance}%
                      </td>
                      <td className="py-2 md:py-4 px-2 md:px-4">
                        <div className="flex flex-col lg:flex-row gap-1 md:gap-2">
                          {[
                            "PRESENT",
                            "ABSENT_WITHOUT_REASON",
                            "ABSENT_WITH_REASON",
                          ].map((status) => {
                            const isSelected =
                              selectedStatus[request.library_id] === status;
                            let colorClasses = "";
                            if (status === "PRESENT")
                              colorClasses = isSelected
                                ? "bg-green-700"
                                : "bg-green-900 opacity-75";
                            if (status === "ABSENT_WITHOUT_REASON")
                              colorClasses = isSelected
                                ? "bg-red-700"
                                : "bg-red-900 opacity-75";
                            if (status === "ABSENT_WITH_REASON")
                              colorClasses = isSelected
                                ? "bg-blue-800"
                                : "bg-blue-950 opacity-75";

                            const displayText = status === "PRESENT" ? "PRESENT" :
                                              status === "ABSENT_WITHOUT_REASON" ? "ABSENT" :
                                              "EXCUSED";

                            return (
                              <button
                                type="button"
                                key={status}
                                onClick={() =>
                                  handleStatusChange(request.library_id, status)
                                }
                                className={`text-white px-2 md:px-3 py-1 rounded text-xs ${colorClasses} whitespace-nowrap`}
                              >
                                <span className="hidden md:inline">{status.replace(/_/g, " ")}</span>
                                <span className="inline md:hidden">{displayText}</span>
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#0ec1e7] hover:bg-[#0ea2e7] px-3 py-2 rounded text-white text-sm cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)}
    {isMarked==2 && <AttendanceAlreadyMarked setIsMarked={setIsMarked}/>}
    </>
  )
};

export default MarkAttendance;