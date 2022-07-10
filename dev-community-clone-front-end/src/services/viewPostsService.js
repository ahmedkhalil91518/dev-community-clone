import axios from "axios";
const baseUrl = "http://localhost:3001/api/viewPosts";

export const showAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
