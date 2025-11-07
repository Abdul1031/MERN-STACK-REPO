import React from "react";
import "../pages/AdminDashboard.css";

export default function Header() {
  return (
    <header className="top-header">
      <div className="header-left">
        <div className="brand">AlMukarramah</div>
      </div>

      <div className="header-right">
        <input className="header-search" placeholder="Search..." />
        <div className="header-user">
          <div className="user-bubble">JD</div>
          <div className="user-name">John Doe</div>
        </div>
      </div>
    </header>
  );
}
