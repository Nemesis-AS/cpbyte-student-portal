import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import { removeProject } from "../redux/slices/TrackerSlice";

function RemoveProject() {
    
  const data = useSelector(state=>state.tracker.data)
  const [projects, setProjects] = useState(data.projects);

  const dispatch = useDispatch()

  const handleRemove = async(projectId) => {
    const toastId = toast.loading("Removing Project")
        if(!projectId){
            return toast.error("Failed to remove Project",{
                id:toastId
            })
        }
        const res = await dispatch(removeProject({projectId}))
        if(res.meta.requestStatus==="fulfilled"){
            toast.success("Project removed",{
                id:toastId
            })
        }else{
            toast.error("Failed to Remove",{
                id:toastId
            })
        }
  };

  useEffect(()=>{
    setProjects(data.projects)
  },[data])

return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
        <div className="p-6 w-full max-w-4xl">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Remove Project
            </h3>
            <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
                Manage your projects. Click "Delete" to remove a project.
            </p>
            <ul className="space-y-4">
                {projects?.map((project) => (
                    <li
                        key={project.id}
                        className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-sm"
                    >
                        <span className="text-gray-300">{project.projectName}</span>
                        <button
                            onClick={() => handleRemove(project.id)}
                            className="bg-[#0ec1e7] text-white py-1 px-3 rounded-md hover:bg-[#0eb4e7] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {(projects?.length === 0 || !projects) && (
                <p className="text-gray-400 mt-4">No projects available to remove.</p>
            )}
        </div>
    </div>
);
}

export default RemoveProject;
