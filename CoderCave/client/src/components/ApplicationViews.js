import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NavItem } from "reactstrap";
import { logout } from '../managers/authManager';
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem> : <Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
        
    </Routes>
  );
};