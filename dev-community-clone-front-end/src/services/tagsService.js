import axios from "axios";
const baseUrl = "http://localhost:3001/api/tags";

export const showAllTags = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};