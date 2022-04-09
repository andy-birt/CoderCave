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

  return (
    <InquireContext.Provider value={{
      inquiries, getAllByTagId,
      inquire, getInquire
    }} >
      {props.children}
    </InquireContext.Provider>
  );
};