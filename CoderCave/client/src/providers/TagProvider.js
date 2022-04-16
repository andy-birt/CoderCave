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

  // I will use this one for editing an existing tag

  const getTagById = (id) => {
    return fetch(`/api/tag/${id}`)
      .then(r => r.json());
  };

  const saveTag = (tag) => {
    return fetch('/api/tag', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    });
  };

  const editTag = (tag) => {
    return fetch(`/api/tag/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    });
  };

  const deleteTag = (id) => {
    return fetch(`/api/tag/${id}`, {
      method: "DELETE"
    })
  };
  
  return (
    <TagContext.Provider value={{
      tags, getAllTags,
      tag, getTag, getTagById,
      saveTag, editTag, deleteTag
    }}>
      {props.children}
    </TagContext.Provider>
  );
};