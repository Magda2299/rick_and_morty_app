import { useEffect, useState } from "react";
import instance from "../infrastructure/services/axios";

const useCharacterData = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);

      const response = await instance.get(`/character/?page=${page}&limit=30`);
      const charactersData = response.data.results;

      // console.log("Fetched characters:", charactersData);

      if (charactersData.length === 0) {
        //  console.log("No more characters ");
        return;
      }
      const uniqueCharactersData = charactersData.filter(
        (character) =>
          !characters.some(
            (existingCharacter) => existingCharacter.name === character.name
          )
      );

      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...uniqueCharactersData,
      ]);

      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(
        error.response
          ? `Error fetching characters: ${error.response.status}`
          : `Error fetching characters: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //console.log("Initial characters:", characters);

    fetchCharacters();
  }, []); // Run once on component mount

  return { characters, loading, error, fetchCharacters };
};

export default useCharacterData;
