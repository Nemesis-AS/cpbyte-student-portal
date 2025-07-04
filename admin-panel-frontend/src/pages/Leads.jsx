import { Edit, Trash2, ArrowDown, ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteUser, getAllLeads } from "../store/adminslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LeadsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const { leads, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllLeads());
  }, [dispatch]);

  const handleDelete = (libId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteUser(libId));
    }
  };
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredUsers = leads.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (!key) return 0;

    const valA = a[key]?.toString().toLowerCase();
    const valB = b[key]?.toString().toLowerCase();

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
  const columns = [
    { key: "name", label: "Name" },
    { key: "library_id", label: "Library ID" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "domain_dev", label: "Domain Dev" },
    { key: "domain_dsa", label: "Domain DSA" },
    { key: "mentor_dev", label: "Mentor Dev" },
    { key: "mentor_dsa", label: "Mentor DSA" },
    { key: "year", label: "Year" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <h5 className="text-xl font-semibold mb-2">Leads Data</h5>
      <p className="text-gray-500 text-sm mb-4">
        List of registered Leads and their details.
      </p>

      <input
        type="text"
        placeholder="Search students..."
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 min-w-[150px] py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {sortConfig.key === key ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedUsers.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.library_id}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.role}</td>
                <td className="px-4 py-2">{student.domain_dev}</td>
                <td className="px-4 py-2">{student.domain_dsa}</td>
                <td className="px-4 py-2">{student.mentor_dev || "-"}</td>
                <td className="px-4 py-2">{student.mentor_dsa || "-"}</td>
                <td className="px-4 py-2">{student.year}</td>
                <td className="px-4 py-2">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(student.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() =>
                        navigate("/editinfo", { state: { user: student } })
                      }
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(student.library_id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeadsTable;
