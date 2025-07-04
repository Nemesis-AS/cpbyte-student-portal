import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserProfile } from "../store/adminslice"; // You need to implement this action

const EditUserInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: state?.user?.name || "",
    email: state?.user?.email || "",
    role: state?.user?.role || "",
    domain_dev: state?.user?.domain_dev || "",
    domain_dsa: state?.user?.domain_dsa || "",
    mentor_dev: state?.user?.mentor_dev || "",
    mentor_dsa: state?.user?.mentor_dsa || "",
    year: state?.user?.year || "",
    library_id: state?.user?.library_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
        ...formData,
        year: parseInt(formData.year, 10), // Convert to number
      };
    dispatch(
      editUserProfile({ libId: formData.library_id, data: updatedData })
    ).then(() => navigate(-1)); // Go back after update
  };

  return (
    <div className="max-w-full mx-auto p-4 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Student Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Role", name: "role" },
          { label: "Domain Dev", name: "domain_dev" },
          { label: "Domain DSA", name: "domain_dsa" },
          { label: "Mentor Dev", name: "mentor_dev" },
          { label: "Mentor DSA", name: "mentor_dsa" },
          { label: "Year", name: "year" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
