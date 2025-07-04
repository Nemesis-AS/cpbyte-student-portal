import { LucidePenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addSkill, removeSkill } from "../redux/slices/TrackerSlice";

function SkillManagement() {
  const data = useSelector((state) => state.tracker.data);
  const [skills, setSkills] = useState(data.skills);
  const [newSkill, setNewSkill] = useState("");

  const dispatch = useDispatch();

  const addSkills = async () => {
    const toastId = toast.loading("Adding Skill");
    if (newSkill.trim() !== "") {
      const res = await dispatch(addSkill({ skill:newSkill }));
      if (res.meta.requestStatus === "fulfilled"){
        toast.success("Skill added", {
          id: toastId,
        });
      }
        else{
          toast.error("Failed to Add skill", {
          id: toastId,
        });
        }
    } else {
      toast.error("Provide Skill", {
        id: toastId,
      });
    }
    setNewSkill("")
  };

  useEffect(() => {
    setSkills(data.skills);
  }, [data]);

  const deleteSkill = async (skill) => {
    const toastId = toast.loading("Removing Skill");
    const res = await dispatch(removeSkill({ skill }));
    if (res.meta.requestStatus === "fulfilled"){
      toast.success("Skill removed", {
        id: toastId,
      });
    }else{
      toast.error("Failed to removed skill", {
        id: toastId,
      });
    }
  };

  return (
    <div className="p-6 w-full">
      <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Skill Management
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Update your skill set to showcase your expertise.
      </p>
      <div className="rounded-lg p-6 w-full flex flex-col space-y-6 bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <LucidePenLine className="text-2xl text-blue-500" />
          <label
            htmlFor="skill"
            className="text-lg font-semibold text-gray-200"
          >
            Add a New Skill
          </label>
          <input
            type="text"
            id="skill"
            value={newSkill}
            placeholder="Enter a skill..."
            className="flex h-12 w-full sm:w-1/3 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            onClick={() => addSkills()}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 h-12 px-6 py-2 shadow-md"
          >
            Add Skill
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex relative items-center bg-gray-800 rounded-lg border border-gray-600 shadow-md"
            >
              <div className="flex justify-center items-center border-r p-2 px-4 border-gray-600 text-gray-300 font-medium">
                {skill}
              </div>
              <button
                onClick={() => deleteSkill(skill)}
                className="absolute text-sm font-medium text-red-500 hover:text-red-400 transition-transform transform hover:scale-110 top-[-8px] left-[-8px]"
              >
                <FaMinusCircle size={"1.2rem"} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillManagement;
