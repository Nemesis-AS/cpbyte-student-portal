import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import StudentTable from "./pages/Students";
import CoordinatorsTable from "./pages/Coordinators";
import LeadsTable from "./pages/Leads";
import EditUserInfo from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route without layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Routes with layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/studenttables"
          element={
            <Layout>
              <StudentTable />
            </Layout>
          }
        />
        <Route
          path="/coordinatorstable"
          element={
            <Layout>
              <CoordinatorsTable />
            </Layout>
          }
        />
        <Route
          path="/leadtables"
          element={
            <Layout>
              <LeadsTable />
            </Layout>
          }
        />
        <Route
          path="/editinfo"
          element={
            <Layout>
              <EditUserInfo />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
