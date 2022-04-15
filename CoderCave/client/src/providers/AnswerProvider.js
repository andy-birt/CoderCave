import { createContext } from "react";

export const AnswerContext = createContext();

export const AnswerProvider = (props) => {

  const getAnswerById = (id) => {
    return fetch(`/api/answer/${id}`)
      .then(r => r.json());
  };

  const saveAnswer = (answer) => {
    return fetch('/api/answer', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    });
  };

  const editAnswer = (answer) => {
    return fetch(`/api/answer/${answer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(answer)
    });
  };

  const deleteAnswer = (answerId) => {
    return fetch(`/api/answer/${answerId}`, {
      method: "DELETE"
    });
  };

  const voteAnswer = (id, value) => {
    return fetch(`/api/answer/${id}?value=${value}`, {
      method: "POST"
    });
  };

  return (
    <AnswerContext.Provider value={{
      getAnswerById, saveAnswer, editAnswer, deleteAnswer, voteAnswer
    }}>
      {props.children}
    </AnswerContext.Provider>
  );
};