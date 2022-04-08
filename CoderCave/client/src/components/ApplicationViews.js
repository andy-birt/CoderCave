import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import InquireDetails from "./inquire/InquireDetails";
import InquireList from "./inquire/InquireList";
import Main from "./main/Main";
import TagDetails from "./tag/TagDetails";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

      <Route path="/inquire/details/:id" element={<InquireDetails />} />

      <Route path="/tag/details/:id" element={<TagDetails />} />

      <Route path="/tag/questions/:id" element={<InquireList isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
        
    </Routes>
  );
};