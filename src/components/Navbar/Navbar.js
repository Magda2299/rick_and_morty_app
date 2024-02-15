import React, { useState } from "react";

import { HomeIcon } from "../../icons/HomeIcon";
import { useSearch } from "../../Context/SearchContext";

const Navbar = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(); // Trigger search as you type
  };

  return (
    <div className="navbar-wrapper">
      <div className="nav-wrapper w-full h-[80px] flex justify-between items-center p-5">
        <div className="logo">
          <HomeIcon />
        </div>

        <div className="search h-8 ">
          <input
            className="border-2 rounded "
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
