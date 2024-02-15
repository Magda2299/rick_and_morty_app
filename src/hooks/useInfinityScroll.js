// useInfiniteScroll.js
import { useState, useEffect } from "react";
import instance from "../infrastructure/services/axios";

const useInfiniteScroll = (initialCharacters) => {
  const [character, setCharacters] = useState(initialCharacters);
  const [offset, setOffset] = useState(initialCharacters.length);

  const fetchData = async () => {
    try {
      console.log("offset:", offset);
      const response = await instance.get(
        `/character/?offset=${offset}&limit=30`
      );
      const newCharacters = response.data.results;

      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("Scroll radi");
      fetchData();
    }
  };

  useEffect(() => {
    console.log("Initial data fetch");
    fetchData();
  }, []); // Fetch initial data

  useEffect(() => {
    if (offset === initialCharacters.length) {
      fetchData();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, initialCharacters.length]);

  return character;
};

export default useInfiniteScroll;
