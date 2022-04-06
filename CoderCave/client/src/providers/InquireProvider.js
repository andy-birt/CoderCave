import { createContext, useState } from "react";

export const InquireContext = createContext();

export const InquireProvider = (props) => {
  
  const [inquiries, setInquiries] = useState([]);
  
  const getAllByTagId = (tagId) => {
    return fetch(`/api/inquire/getbytag/${tagId}`)
      .then(r => r.json())
      .then(setInquiries);
  };

  return (
    <InquireContext.Provider value={{
      inquiries, getAllByTagId
    }} >
      {props.children}
    </InquireContext.Provider>
  );
};