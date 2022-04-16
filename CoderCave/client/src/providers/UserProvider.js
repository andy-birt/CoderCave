import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => { 

  const getCurrentUser = (id) => {
    return fetch(`/api/user/${id}`)
      .then(r => r.json());
  };

  const getUserById = (id) => {
    return fetch(`/api/user?userid=${id}`)
      .then(r => r.json());
  };

  return (
    <UserContext.Provider value={{
      getUserById, getCurrentUser
    }}>
      {props.children}
    </UserContext.Provider>
  );
};