import React from 'react';
import { Bell, Moon, Search, User } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="h-16 bg-white  flex items-center justify-between px-4 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search or type command..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          <span className="absolute right-3 top-2 text-xs text-gray-400 border px-1.5 py-0.5 rounded">⌘K</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Moon className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-medium">Musharof</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;