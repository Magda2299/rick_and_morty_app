import axios from "axios";

const baseURL = process.env.API_BASE_URL;

const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
  headers: {
    "Content-Type": "application/json",
    //  Authorization: `<Your Auth Token>`,
  },
  // .. other options
});




export default instance;
