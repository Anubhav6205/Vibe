// File: SearchContext.js
import  { createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
 
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SearchProvider;
