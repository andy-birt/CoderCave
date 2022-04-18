import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => { 

  const getActiveUsers = () => {
    return fetch('/api/user/active')
      .then(r => r.json());
  };

  const getInactiveUsers = () => {
    return fetch('/api/user/inactive')
      .then(r => r.json());
  };

  const getCurrentUser = (id) => {
    return fetch(`/api/user/${id}`)
      .then(r => r.json());
  };

  const getUserById = (id) => {
    return fetch(`/api/user?userid=${id}`)
      .then(r => r.json());
  };

  const deactivateUser = (id) => {
    return fetch(`/api/user/deactivate/${id}`, {
      method: "PUT"
    })
      .catch(e => e.text());
  };

  const activateUser = (id) => {
    return fetch(`/api/user/activate/${id}`, {
      method: "PUT"
    });
  };

  const demoteUser = (id) => {
    return fetch(`/api/user/demote/${id}`, {
      method: "PUT"
    })
      .catch(e => e.text());
  };

  const promoteUser = (id) => {
    return fetch(`/api/user/promote/${id}`, {
      method: "PUT"
    });
  };

  return (
    <UserContext.Provider value={{
      getUserById, getCurrentUser, getActiveUsers, getInactiveUsers, deactivateUser, activateUser, demoteUser, promoteUser
    }}>
      {props.children}
    </UserContext.Provider>
  );
};