import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {

  const [searchTerm, setSearchTerm] = useState("");

  const getSearchResult = (p) => {
    return fetch(`/api/inquire/search?q=${searchTerm}&page=${p}`)
      .then(r => r.json());
  };

  return (
    <SearchContext.Provider value={{
      getSearchResult, searchTerm, setSearchTerm
    }}>
      {props.children}
    </SearchContext.Provider>
  );
};