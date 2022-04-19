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
import InquireCommentForm from "./comment/InquireCommentForm";
import AnswerCommentForm from "./comment/AnswerCommentForm";
import TagListAdmin from "./tag/TagListAdmin";
import TagForm from "./tag/TagForm";
import UserList from "./user/UserList";
import UserDetails from "./user/UserDetails";
import UserForm from "./user/UserForm";

export default function ApplicationViews({ isLoggedIn, isAdmin }) {
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

      <Route path="/inquire/answer/:id" element={<AnswerForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/inquire/answer/edit/:id" element={<AnswerForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/inquire/comment/:id" element={<InquireCommentForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/inquire/comment/edit/:id" element={<InquireCommentForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/inquire/answer/comment/:id" element={<AnswerCommentForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/inquire/answer/comment/edit/:id" element={<AnswerCommentForm isLoggedIn={isLoggedIn} /> } />

      <Route path="/tag" element={isAdmin ? <TagListAdmin /> : <>Turn Back Now</>} />

      <Route path="/tag/new" element={isAdmin ? <TagForm /> : <>Turn Back Now</>} />

      <Route path="/tag/edit/:id" element={isAdmin ? <TagForm /> : <>Turn Back Now</>} />

      <Route path="/tag/details/:id" element={<TagDetails isAdmin={isAdmin} />} />

      <Route path="/tag/questions/:id" element={<InquireList isLoggedIn={isLoggedIn} />} />

      <Route path="/user/active" element={isAdmin ? <UserList /> : <>Turn Back Now</>} />

      <Route path="/user/inactive" element={isAdmin ? <UserList /> : <>Turn Back Now</>} />

      <Route path="/user/details/:id" element={<UserDetails />} />

      <Route path="/user/edit/:id" element={<UserForm />} />

      <Route path="/search/page/:page" element={<Result />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
        
    </Routes>
  );
};