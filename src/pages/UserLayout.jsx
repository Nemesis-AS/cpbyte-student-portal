import React from 'react'

import { Outlet } from 'react-router-dom';
import Navbar from '../componenets/Navbar';

function UserLayout() {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <div className='flex-1 md:ml-60 transition-all duration-300 ease-in-out'>
        <div className='MainContent w-full min-h-screen bg-white flex flex-col justify-center items-center'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
