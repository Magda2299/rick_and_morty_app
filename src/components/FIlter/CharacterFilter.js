import React, { useEffect, useState } from "react";

const CharacterFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    alive: false,
    dead: false,
    unknown: false,
    any: false,
  });

  const handleFilterChange = (filter) => {
    const updatedFilters = {
      any: false,
      alive: false,
      dead: false,
      unknown: false,
    }; // Reset
    updatedFilters[filter] = !filters[filter];
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-wrapper flex p-8 gap-5">
      <h3>Character status:</h3>
      <label className="">
        <input
          className="mr-2"
          type="radio"
          checked={filters.any}
          onChange={() => handleFilterChange()}
        />
        Any
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          checked={filters.alive}
          onChange={() => handleFilterChange("alive")}
        />
        Alive
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          checked={filters.dead}
          onChange={() => handleFilterChange("dead")}
        />
        Dead
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          checked={filters.unknown}
          onChange={() => handleFilterChange("unknown")}
        />
        Unknown
      </label>
    </div>
  );
};

export default CharacterFilter;
