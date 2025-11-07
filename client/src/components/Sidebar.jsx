import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api/axiosInstance";
import "../pages/AdminDashboard.css";

export default function Sidebar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setRole(res.data.role);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    getUser();
  }, []);

  return (
    <aside className="sidebar-left">
      <div className="sidebar-top">
        <div className="role-badge">
          Role: {role ? role.charAt(0).toUpperCase() + role.slice(1) : "..."}
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/projects" className="nav-item">
          <span className="nav-icon">📁</span>
          <span className="nav-text">Projects</span>
        </NavLink>

        <NavLink to="/dashboard/users" className="nav-item">
          <span className="nav-icon">👥</span>
          <span className="nav-text">Users</span>
        </NavLink>

        <div className="nav-item disabled">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="logout-btn"
          onClick={() => {
            document.cookie = "token=; Max-Age=0";
            window.location.href = "/login";
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
