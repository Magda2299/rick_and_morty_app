import React from "react";
import { useEffect, useState } from "react";
import instance from "../infrastructure/services/axios";
import "./Home.css";
import CharacterFilter from "../components/FIlter/CharacterFilter";
import { useSearch } from "../Context/SearchContext";
import useInfiniteScroll from "../hooks/useInfinityScroll";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const [sortOrder, setSortOrder] = useState("asc");
  const character = useInfiniteScroll(filteredCharacters);
  const { searchResults } = useSearch();

  const getAllCharacters = async () => {
    try {
      const response = await instance.get("character");
      const charactersData = response.data.results;
      setCharacters(charactersData);
      setFilteredCharacters(charactersData);
    } catch (error) {
      console.error(
        "Error fetching characters:",
        error.response ? error.response.status : error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  useEffect(() => {
    //Kada se pretrazeni podaci promene update-ujemo filtrirane karaktere
    setCharacters(searchResults);
    setFilteredCharacters(searchResults);
  }, [searchResults]);

  const handleFilterChange = (filters) => {
    //filtriramo po kriterijumima
    const filtered = characters.filter((character) => {
      if (filters.any && character.status === "Any") {
        return false;
      }
      if (filters.alive && character.status === "Alive") {
        return true;
      }
      if (filters.dead && character.status === "Dead") {
        return true;
      }
      if (filters.unknown && character.status === "unknown") {
        return true;
      }
      return false;
    });

    //sortiranje
    sortCharacters(filtered, sortOrder);
  };
  //sortiranje
  const sortCharacters = (charactersToSort, order) => {
    const sorted = [...charactersToSort].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    //Update sortirano
    setFilteredCharacters(sorted);
  };

  useEffect(() => {
    setCharacters(searchResults);
  }, [searchResults]);

  return (
    <div className="home-wrapper bg-slate-400 h-full w-full flex flex-col items-center">
      <div className="items-center flex justify-center w-full ">
        <CharacterFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="container flex flex-col w-full">
        <div className=" flex flex-wrap justify-center gap-8 p-8 ">
          {character.map((character) => (
            <div className="flex-row items center justify-center md:flex md:flex-col font-bold items-center md:w-[20%]  bg-white rounded-lg">
              <img
                className="card-character rounded-lg h-auto md:h-[200px] md:w-full"
                src={character.image}
                alt={character.name}
              ></img>
              <p className="p-5 flex items-center justify-center">
                {" "}
                {character.name}
              </p>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
