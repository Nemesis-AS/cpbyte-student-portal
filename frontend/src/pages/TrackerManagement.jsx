import { LayoutDashboardIcon, PlusCircleIcon, Projector } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaListCheck } from "react-icons/fa6";
import React from 'react';
import { IoRemoveCircleOutline } from 'react-icons/io5';

function TrackerManagement() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 w-full transition-colors duration-300">
      <div className="container mx-auto px-[5vw] py-8">
        <div className='flex gap-2 items-center mb-2 md:mb-4'>
            <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
            <span className='text-white text-lg md:text-2xl'>Manage Tracker</span>
        </div>
        <div className="flex flex-col lg:flex-row w-full min-h-[80vh]">
          <div className="w-full lg:w-1/4 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg lg:mr-4 mb-4 lg:mb-0">
            <nav>
              <ul className="space-y-24 px-2 duration-200">
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker" ? "bg-gray-800 border-gray-700" : "border-gray-900"
                  }`}
                >
                  <FaListCheck className="w-5 h-5 mr-2" />
                  <Link to={""} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Manage Platforms
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/AddProject" ? "bg-gray-800 border-gray-700" : "border-gray-900"
                  }`}
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  <Link to={"AddProject"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Add Project
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/RemoveProject" ? "bg-gray-800 border-gray-700" : "border-gray-900"
                  }`}
                >
                  <IoRemoveCircleOutline className="w-5 h-5 mr-2" />
                  <Link to={"RemoveProject"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Remove Project
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/SkillManagement" ? "bg-gray-800 border-gray-700" : "border-gray-900"
                  }`}
                >
                  <LayoutDashboardIcon className="w-5 h-5 mr-2" />
                  <Link to={"SkillManagement"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Skill Management
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full lg:w-3/4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackerManagement