import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getEvents, addEvents, removeEvents} from '../redux/slices/eventSlice';
import toast from 'react-hot-toast';

const UserSchedule = () => {
  const user = useSelector(state => state.dashboard.data);
  const { event } = useSelector(state => state.event);
  
  const dispatch = useDispatch();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("General")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatMonthKey = (currentMonth)=>{
    return `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
  }

  useEffect(() => {
    async function getMonthsEvents() {
      const month = formatMonthKey(currentMonth);

      if(event[month])
        return;
        dispatch(getEvents({month}));         
    }
      getMonthsEvents();
      
  }, [currentMonth]);

  const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];
  const weekdays = isMobile ? ["S", "M", "T", "W", "T", "F", "S"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const addEvent = async() => {
    const toastId = toast.loading("Adding Event..")
    if (!title.trim()) return;    

    const dateKey = new Date(selectedDate);    
    const utcDateOnly = new Date(Date.UTC(
      dateKey.getFullYear(),
      dateKey.getMonth(),
      dateKey.getDate()
    ));
      const res = await dispatch(addEvents({date:utcDateOnly, title, discription, category}))
      if(res.meta.requestStatus==="fulfilled")
        toast.success("Event Added Successfully",{
          id:toastId
      })
      setTitle("");
      setDiscription("");
      setCategory("General");
  };
  
  const removeEvent = async(eventId, eventDate) => {
    const toastId = toast.loading("Removing Event..")
    const res = await dispatch(removeEvents({eventId, eventDate}))
    if(res.meta.requestStatus==="fulfilled")
        toast.success("Event Removed Successfully",{
            id:toastId
        })
  };
  
  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-[#070b0f] pt-16 text-gray-100 p-2 md:p-4 w-full py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-4 md:mb-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center space-x-2">
              <div className='bg-[#0ec1e7] w-1 md:w-2 h-6 md:h-8 rounded-full'></div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Schedule</h1>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              <button onClick={prevMonth} className="p-1 md:p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h2 className="text-sm md:text-xl font-semibold flex items-center px-2 md:px-4">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="p-1 md:p-2 rounded-full hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-7 gap-1 mb-1 md:mb-2">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center py-1 md:py-2 text-gray-400 font-medium text-xs md:text-base">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-4 md:mb-6">
          {days.map((day, index) => {
            const dateKey = day ? formatDateKey(day) : null;
            const isToday = day ? 
              day.getDate() === new Date().getDate() && 
              day.getMonth() === new Date().getMonth() && 
              day.getFullYear() === new Date().getFullYear() : false;
            
            const isSelected = day ?
              day.getDate() === selectedDate.getDate() &&
              day.getMonth() === selectedDate.getMonth() &&
              day.getFullYear() === selectedDate.getFullYear() : false;
              
            const dayEvents = dateKey && event[formatMonthKey(currentMonth)] ? (event[formatMonthKey(currentMonth)][dateKey] || []) : [];
            
            const cellHeightClass = isMobile ? 'h-14 md:h-24' : 'h-24';
            
            return (
              <div 
                key={index} 
                className={`p-1 ${cellHeightClass} border border-gray-800 rounded ${day ? 'bg-gray-800 hover:bg-gray-700 cursor-pointer' : 'bg-gray-900'} ${isSelected ? 'ring-2 ring-[#0ec1e7]' : ''}`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div className={`text-xs p-1 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center ${isToday ? 'bg-[#0ec1e7] text-white' : 'text-gray-300'}`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 overflow-y-auto max-h-8 md:max-h-16">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="bg-purple-500 text-white text-xs p-0.5 md:p-1 mb-0.5 md:mb-1 rounded truncate flex justify-between"
                        >
                          <span className="truncate text-xs">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {user.role === "COORDINATOR" && (
          <>
            <div className="bg-gray-800 p-3 md:p-4 rounded-lg shadow-lg">
              <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
                {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>
              
              <div className="mb-3 md:mb-4">            
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add event title"
                  className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
                  rows="2"
                />
                <select name="category" id="category" className='w-full p-2 mt-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="General">General</option>
                  <option value="Class">Class</option>
                </select>
                <textarea
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Add event description"
                  className="w-full p-2 mt-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-[#0ec1e7] focus:ring focus:ring-[#0ec1e7] focus:ring-opacity-50"
                  rows="2"
                />
              </div>
              
              <button
                onClick={addEvent}
                className="bg-[#0ec1e7] hover:bg-[#259fdc] text-white py-1.5 md:py-2 px-3 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#0ec1e7] focus:ring-opacity-50 text-sm md:text-base"
              >
                Add Event
              </button>
            </div>
            
            <div className="mt-4 md:mt-6">
              <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 text-[#0ec1e7]">
                Events for {selectedDate.getDate()} {months[selectedDate.getMonth()]}
              </h3>
              
              {event[formatMonthKey(currentMonth)] && event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)] && event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].length > 0 ? (
                <div className="space-y-1 md:space-y-2">
                  {
                  event[formatMonthKey(currentMonth)][formatDateKey(selectedDate)].map((event) => (
                    <div 
                      key={event.id} 
                      className="p-2 md:p-3 rounded flex justify-between items-center border-b-2 border-[#0ec1e7] bg-gray-800"
                    >
                      <span className="text-sm md:text-base break-words flex-1 pr-2">{event.title}</span>
                      <button
                        onClick={() => removeEvent(event.id, formatDateKey(selectedDate))}
                        className="p-1 text-red-500 cursor-pointer hover:bg-black hover:bg-opacity-20 rounded text-xs md:text-sm whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm md:text-base">No events scheduled for this day.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSchedule;