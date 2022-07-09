import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

export const addPost = async (newObject, token) => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await axios.post(baseUrl + "/add", newObject, config);
    return response.data;
  };