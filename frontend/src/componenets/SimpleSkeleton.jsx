import React from "react"; 
import "./SimpleSkeleton.css"; 
 
const SimpleSkeleton = () => ( 
  <div className="w-full p-4 lg:p-12 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
    {[...Array(3)].map((_, i) => ( 
      <div key={i} className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: '#050301' }}> 
        <div className="skeleton h-6 w-32 mb-4"></div> 
        <div className="skeleton h-36 w-full mb-4"></div> 
        <div className="skeleton h-4 w-full mb-2"></div> 
        <div className="skeleton h-4 w-2/3"></div> 
      </div> 
    ))} 
    <div className="col-span-full mt-10"> 
      <div className="skeleton h-10 w-1/2 mb-4"></div> 
      {[...Array(5)].map((_, i) => ( 
        <div key={i} className="skeleton h-4 w-full mb-2"></div> 
      ))} 
    </div> 
  </div> 
); 
 
export default SimpleSkeleton;  

