import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { SearchProvider } from "../Context/SearchContext";

const Layout = ({ children, searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="app">
      <SearchProvider>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div className="content">{children}</div>
        <Outlet setSearchTerm={setSearchTerm} />
      </SearchProvider>
    </div>
  );
};

export default Layout;
