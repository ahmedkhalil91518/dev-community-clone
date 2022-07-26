import axios from "axios";
const baseUrl = "http://localhost:3001/api/viewComments";

export const showPostComments = async (id) => {
  const response = await axios.get(baseUrl + "/" + id);
  return response.data;
};
