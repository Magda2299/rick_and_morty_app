import React, { useState } from "react";

const CharacterFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("any");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filter-wrapper flex p-8 gap-5">
      <h3>Character status:</h3>
      {["any", "alive", "dead", "unknown"].map((filter) => (
        <label key={filter}>
          <input
            className="mr-2"
            type="radio"
            checked={selectedFilter === filter}
            onChange={() => handleFilterChange(filter)}
          />
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default CharacterFilter;
