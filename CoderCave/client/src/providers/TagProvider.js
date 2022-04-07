import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {

  const [tags, setTags] = useState([]);

  const [tag, setTag] = useState({});
  
  const getAllTags = () => {
    return fetch('/api/tag')
      .then(r => r.json())
      .then(setTags);
  };

  const getTag = (id) => {
    return fetch(`/api/tag/${id}`)
      .then(r => r.json())
      .then(setTag);
  };
  
  return (
    <TagContext.Provider value={{
      tags, getAllTags,
      tag, getTag
    }}>
      {props.children}
    </TagContext.Provider>
  );
};