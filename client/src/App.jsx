import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;
