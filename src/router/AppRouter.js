import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import instance from "../infrastructure/services/axios";

const AppRouter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await instance.get(
        `https://rickandmortyapi.com/api/character${searchTerm}`
      );
      //console.log(response,"response");
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          setSearchResults={setSearchResults}
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              setSearchResults={setSearchResults}
            />
          ),
        },
      ],
    },
  ]);
  return (
    <div>
      {" "}
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
