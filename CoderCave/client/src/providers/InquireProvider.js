import { createContext, useState } from "react";

export const InquireContext = createContext();

export const InquireProvider = (props) => {
  
  const [inquiries, setInquiries] = useState([]);

  const [inquire, setInquire] = useState({});
  
  const getAllByTagId = (tagId) => {
    return fetch(`/api/inquire/getbytag/${tagId}`)
      .then(r => r.json())
      .then(setInquiries);
  };

  const getInquire = (id) => {
    return fetch(`/api/inquire/${id}`)
      .then(r => r.json())
      .then(setInquire);
  };

  const saveInquire = (inquire) => {
    return fetch("/api/inquire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inquire)
    }).then(r => r.json());
  };

  const editInquire = (inquire) => {
    return fetch(`/api/inquire/${inquire.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inquire)
    });
  };

  const voteInquire = (id, value) => {
    return fetch(`/api/inquire/${id}?value=${value}`, {
      method: "POST"
    });
  };

  return (
    <InquireContext.Provider value={{
      inquiries, getAllByTagId,
      inquire, getInquire, saveInquire, editInquire,
      voteInquire
    }} >
      {props.children}
    </InquireContext.Provider>
  );
};