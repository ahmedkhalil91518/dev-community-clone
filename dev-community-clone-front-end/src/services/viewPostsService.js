import axios from "axios";
const baseUrl = "http://localhost:3001/api/viewPosts";

export const showAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const showSinglePost = async (id) => {
  const response = await axios.get(baseUrl + "/post/" + id);
  return response.data;
};

export const showTagPosts = async (tag) => {
  const response = await axios.get(baseUrl + "/tag/" + tag);
  return response.data;
};