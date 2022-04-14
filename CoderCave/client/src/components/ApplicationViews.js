import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Login from "./auth/Login";
import Register from "./auth/Register";
import InquireDetails from "./inquire/InquireDetails";
import InquireForm from "./inquire/InquireForm";
import InquireList from "./inquire/InquireList";
import Main from "./main/Main";
import Result from "./result/Result";
import TagDetails from "./tag/TagDetails";
import AnswerForm from "./answer/AnswerForm";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

      <Route path="/inquire/details/:id" element={
        <Container>
          <InquireDetails isLoggedIn={isLoggedIn} />
        </Container>
      } />

      <Route path="/inquire/new" element={
        <Container>
          <InquireForm isLoggedIn={isLoggedIn}/>
        </Container>
      } />

      <Route path="/inquire/edit/:id" element={
        <Container>
          <InquireForm isLoggedIn={isLoggedIn}/>
        </Container>
      } />

      <Route path="/inquire/answer/:id" element={<AnswerForm /> } />

      <Route path="/tag/details/:id" element={<TagDetails />} />

      <Route path="/tag/questions/:id" element={<InquireList isLoggedIn={isLoggedIn} />} />

      <Route path="/search/:page" element={<Result />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
        
    </Routes>
  );
};