import instance from "./axios";
//fechujemo karaktere
const getAllCharacters = async () => {
  try {
    const response = await instance.get("character");
    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching characters:",
      error.response ? error.response.status : error.message
    );
    throw error;
  }
};

export { getAllCharacters };
