import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalCoordinators, setTotalCoordinators] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    // Fetch club statistics data (replace with actual API call)
    setTotalStudents(100);
    setTotalMembers(80);
    setTotalCoordinators(10);
    setTotalLeads(5);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Club Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-blue-100 text-blue-900 shadow-md">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-2xl">{totalStudents}</p>
        </Card>
        <Card className="p-4 bg-green-100 text-green-900 shadow-md">
          <h2 className="text-xl font-semibold">Total Members</h2>
          <p className="text-2xl">{totalMembers}</p>
        </Card>
        <Card className="p-4 bg-yellow-100 text-yellow-900 shadow-md">
          <h2 className="text-xl font-semibold">Total Coordinators</h2>
          <p className="text-2xl">{totalCoordinators}</p>
        </Card>
        <Card className="p-4 bg-red-100 text-red-900 shadow-md">
          <h2 className="text-xl font-semibold">Total Leads</h2>
          <p className="text-2xl">{totalLeads}</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
