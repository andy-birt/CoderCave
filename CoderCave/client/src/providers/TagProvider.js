import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {

  const [tags, setTags] = useState([]);
  
  const getAllTags = () => {
    return fetch('/api/tag')
      .then(r => r.json())
      .then(setTags);
  };
  
  return (
    <TagContext.Provider value={{
      tags, getAllTags
    }}>
      {props.children}
    </TagContext.Provider>
  );
};