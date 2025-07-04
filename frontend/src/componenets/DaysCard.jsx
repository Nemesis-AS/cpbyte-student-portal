import React from 'react'
import { FiClock } from "react-icons/fi";
import { TbCalendarCode } from "react-icons/tb";

function DaysCard(props) {
    const { date, subject, status } = props;
  return (
    <div className='flex flex-col gap-1 bg-gray-800 rounded-2xl overflow-hidden p-2'>
        <div className='flex justify-between items-center p-1'>
            <div className='flex justify-start items-center gap-2'>
                <FiClock size={20}/>
                <span>{date}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${status==="PRESENT"?"bg-green-500":"bg-red-500"} flex justify-center items-center`}> 
            </div>
        </div>
        <div className='flex gap-2 items-center p-2'>
            <TbCalendarCode size={20}/>
            <span className={`${subject==="DSA"?"text-[#ffa000]":"text-[#f700ff]"}`}>{subject}</span>
        </div>
    </div>
  )
}

export default DaysCard
