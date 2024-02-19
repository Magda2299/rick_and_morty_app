import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import { useSearch } from "../Context/SearchContext";
import useCharacterData from "../hooks/useCharacterData";
import CharacterFilter from "../components/FIlter/CharacterFilter";
import useInfiniteScroll from "../hooks/useInfinityScroll";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("any");
  const { characters, loading, error, fetchCharacters } = useCharacterData();
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const { searchResults } = useSearch();
  const containerRef = useInfiniteScroll(() => {
    fetchCharacters();
  });

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filterCharacters = () => {
    switch (selectedFilter) {
      case "any":
        setFilteredCharacters(characters);
        break;
      case "alive":
      case "dead":
      case "unknown":
        const filtered = characters.filter(
          (character) =>
            character.status.toLowerCase() === selectedFilter.toLowerCase()
        );
        setFilteredCharacters(filtered);
        //   console.log(` '${selectedFilter}':`, filtered);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // Fetch characters on component mount
    fetchCharacters();
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [characters, selectedFilter]);
  useEffect(() => {
    setFilteredCharacters(searchResults);
  }, [searchResults]);

  return (
    <div className="home-wrapper bg-slate-400 h-full w-full flex flex-col items-center">
      <div className="items-center flex justify-center w-full ">
        <CharacterFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="  container flex flex-col w-full">
        <div
          ref={containerRef}
          className=" h-[700px]  overflow-y-auto flex flex-wrap justify-center gap-8 p-8 "
        >
          {filteredCharacters.map((character) => (
            <div className="flex-row items center justify-center md:flex md:flex-col font-bold items-center md:w-[20%]  bg-white rounded-lg">
              <img
                className="card-character rounded-lg h-fit md:w-full"
                src={character.image}
                alt={character.name}
              ></img>
              <p className="p-5 flex items-center justify-center">
                {" "}
                {character.name}
              </p>
            </div>
          ))}

          <div>
            {" "}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
