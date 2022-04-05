import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Main from "./main/Main";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
        
    </Routes>
  );
};