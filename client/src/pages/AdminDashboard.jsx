import React from "react";
import "../pages/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-wrap">
      <div className="dashboard-header">
        <h1>Superadmin Dashboard</h1>
        <p className="dashboard-sub">
          Welcome back, John. Here's what's happening today.
        </p>
      </div>

      <div className="cards-row">
        <div className="card stat-card">
          <div className="stat-title">Active Projects</div>
          <div className="stat-value">24</div>
          <div className="stat-sub">↑ 12% vs last month</div>
        </div>

        <div className="card stat-card">
          <div className="stat-title">Upcoming Tasks</div>
          <div className="stat-value">5</div>
          <div className="stat-sub">Deadline: Next 7 days</div>
        </div>
      </div>

      <div className="panel card big-panel">
        <div className="panel-header">
          <div className="panel-title">Active Projects</div>
          <div className="panel-action">View All</div>
        </div>
        <div className="panel-body">
          <div className="empty-state">
            No projects yet. Click "Projects" on the left to manage them.
          </div>
        </div>
      </div>
    </div>
  );
}
