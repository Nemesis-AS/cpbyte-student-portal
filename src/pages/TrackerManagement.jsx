import { LayoutDashboardIcon, PlusCircleIcon, Projector } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaListCheck } from "react-icons/fa6";
import React,{useRef,useEffect,useState} from 'react';
import { IoRemoveCircleOutline } from 'react-icons/io5';
import * as THREE from 'three';

function TrackerManagement() {
  const location = useLocation();

  const vantaRef = useRef(null);
    const vantaEffect = useRef(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const loadVanta = async () => {
        const VANTA = await import('vanta/dist/vanta.net.min');
  
        if (isMounted && !vantaEffect.current) {
          vantaEffect.current = VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: false,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xfff5,
            backgroundColor: 0x000000,
            points: 20.00,
            maxDistance: 10.00,
            spacing: 20.00
          });
        }
      };
  
      loadVanta();
  
      return () => {
        isMounted = false;
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }
      };
    }, []);


  return (
    <div ref={vantaRef} className="min-h-screen  text-gray-900 dark:text-gray-100 w-full transition-colors duration-300">
      <div className="container mx-auto px-[5vw] py-8">
        <div className='flex gap-2 items-center mb-2 md:mb-4'>
            <div className='w-2 h-8 bg-[#0ec1e7] rounded-2xl'></div>
            <span className='text-white text-lg md:text-2xl'>Manage Tracker</span>
        </div>
        <div className="flex flex-col lg:flex-row w-full min-h-[80vh]">
          <div className="w-full lg:w-1/4 p-4 backdrop-blur-sm border border-gray-50 rounded-lg lg:mr-4 mb-4 lg:mb-0">
            <nav>
              <ul className="space-y-24 px-2 duration-200">
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker" ? "border-gray-50 backdrop-blur-3xl" : "border-gray-900"
                  }`}
                >
                  <FaListCheck className="w-5 h-5 mr-2" />
                  <Link to={""} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Manage Platforms
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/AddProject" ? "backdrop-blur-3xl border-gray-50" : "border-gray-900"
                  }`}
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  <Link to={"AddProject"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Add Project
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/RemoveProject" ? "backdrop-blur-3xl border-gray-50" : "border-gray-900"
                  }`}
                >
                  <IoRemoveCircleOutline className="w-5 h-5 mr-2" />
                  <Link to={"RemoveProject"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Remove Project
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 border-2 ${
                    location.pathname === "/ManageTracker/SkillManagement" ? "backdrop-blur-3xl border-gray-50" : "border-gray-900"
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
          <div className="w-full lg:w-3/4 p-4 border border-gray-50 backdrop-blur-sm rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackerManagement