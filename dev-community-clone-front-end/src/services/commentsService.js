import axios from "axios";
const baseUrl = "http://localhost:3001/api/comments";

export const addComment = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};