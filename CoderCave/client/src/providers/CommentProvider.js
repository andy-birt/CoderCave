import { createContext } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  
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
      saveInquireComment, editInquireComment, deleteInquireComment,
      saveAnswerComment, editAnswerComment, deleteAnswerComment
    }} >
      {props.children}
    </CommentContext.Provider>
  );
};