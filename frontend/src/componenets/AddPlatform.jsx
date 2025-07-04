import React, { useEffect, useState } from "react";
import { SiCodechef, SiLeetcode, SiGeeksforgeeks, SiGithub } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addGitHub, addLeetcode } from "../redux/slices/TrackerSlice";

function AddPlatforms() {
  const data = useSelector((state)=>state.tracker.data)

  const dispatch = useDispatch()

  const [gfgUsername, setGfgUsername] = useState("");
  const [hackerank, setHackerank] = useState("");
  const [codechef, setCodechef] = useState("");
  const [github, setGithub] = useState(data.github.username);
  const [leetcodeUsername, setLeetcodeUsername] = useState(
    data.leetcode.username
  );

  useEffect(()=>{
    setGithub(data.github.username)
    setLeetcodeUsername(data.leetcode.username)
  },[data])

  const handlePlatform = async (platform) => {
    if (platform === "Leetcode") {
      const toastId = toast.loading("Adding Leetcode")
      if(!leetcodeUsername){
        return toast.error("Fill the required field",{
          id:toastId
        })
      }
      const res = await dispatch(addLeetcode({leetcodeUsername}))
      if(res.meta.requestStatus === "fulfilled")
        toast.success("Leetcode Added",{
          id:toastId
      })
    }
    else if (platform === "github") {
      const toastId = toast.loading("Added Github")
      if(!github){
        return toast.error("Fill the required field",{
          id:toastId
        })
      }
      const res = await dispatch(addGitHub({githubUsername:github}))
      if(res.meta.requestStatus === "fulfilled")
        toast.success("Github Added",{
          id:toastId
      })
    } else if (platform === "GFG") {
    } else if (platform === "codechef") {
    } else if (platform === "hackerrank") {
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
        Manage Platforms
      </h3>
      <p className={`text-sm text-gray-500 dark:text-gray-400 mb-8`}>
        Add your Coding Platforms. You'll need to verify them.
      </p>
      <div className="space-y-4 flex flex-col rounded-lg p-6 bg-gray-100 dark:bg-gray-800 mb-7">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <SiLeetcode className="text-white" size={"1.5rem"} />
            <label htmlFor="leetcode" className="w-[7rem]">
              Leetcode
            </label>
          </div>
          <input
            type="text"
            id="leetcode"
            placeholder="Leetcode Username"
            onChange={(e) => setLeetcodeUsername(e.target.value)}
            value={leetcodeUsername}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("Leetcode")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <SiGeeksforgeeks className="text-white" size={"1.5rem"} />
            <label htmlFor="gfg" className="w-[7rem]">
              GFG
            </label>
          </div>
          <input
            type="text"
            id="gfg"
            disabled
            placeholder="GFG Username"
            onChange={(e) => setGfgUsername(e.target.value)}
            value={gfgUsername}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled
            onClick={() => handlePlatform("gfg")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <FaHackerrank className="text-white" size={"1.5rem"} />
            <label htmlFor="hackerank" className="w-[7rem]">
              Hackerank
            </label>
          </div>
          <input
            type="text"
            placeholder="Hackerank Username"
            disabled
            onChange={(e) => setHackerank(e.target.value)}
            value={hackerank}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled
            onClick={() => handlePlatform("hackerank")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <SiCodechef className="text-white" size={"1.5rem"} />
            <label htmlFor="code chef" className="w-[7rem]">
              Code chef
            </label>
          </div>
          <input
            type="text"
            placeholder="Code chef Username"
            disabled
            onChange={(e) => setCodechef(e.target.value)}
            value={codechef}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled
            onClick={() => handlePlatform("codechef")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <SiGithub className="text-white" size={"1.5rem"} />
            <label htmlFor="github" className="w-[7rem]">
              Github
            </label>
          </div>
          <input
            type="text"
            placeholder="Github Username"
            onChange={(e) => setGithub(e.target.value)}
            value={github}
            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-gray-500"
          />
          <button
            type="submit"
            onClick={() => handlePlatform("github")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 dark:bg-blue-700 dark:hover:bg-blue-800 h-10 px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPlatforms;