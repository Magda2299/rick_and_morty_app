import { createContext, useContext, useState } from "react";
import instance from "../infrastructure/services/axios";
//start up contexta
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      //console.log("ssss", searchTerm);
      if (searchTerm.trim() !== "") {
        const response = await instance.get(`/character/?name=${searchTerm}`);
        //  console.log(response.data.results, "ddd");
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetchi data:", error);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
