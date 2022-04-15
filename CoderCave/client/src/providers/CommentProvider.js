import { createContext } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  
  const getInquireCommentById = (id) => {
    return fetch(`/api/inquirecomment/${id}`)
    .then(r => r.json());
  };

  const saveInquireComment = (comment) => {
    return fetch('/api/inquirecomment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
  };

  const editInquireComment = (comment) => {
    return fetch(`/api/inquirecomment/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
  };

  const deleteInquireComment = (commentId) => {
    return fetch(`/api/inquirecomment/${commentId}`, {
      method: "DELETE"
    });
  };

  const getAnswerCommentById = (id) => {
    return fetch(`/api/answercomment/${id}`)
    .then(r => r.json());
  };

  const saveAnswerComment = (comment) => {
    return fetch('/api/answercomment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
  };

  const editAnswerComment = (comment) => {
    return fetch(`/api/answercomment/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
  };

  const deleteAnswerComment = (commentId) => {
    return fetch(`/api/answercomment/${commentId}`, {
      method: "DELETE"
    });
  };
  
  return (
    <CommentContext.Provider value={{
      saveInquireComment, editInquireComment, deleteInquireComment, getInquireCommentById,
      saveAnswerComment, editAnswerComment, deleteAnswerComment, getAnswerCommentById
    }} >
      {props.children}
    </CommentContext.Provider>
  );
};