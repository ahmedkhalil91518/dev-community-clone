import axios from "axios";
const baseUrl = "http://localhost:3001/api/signup";

const signup = async (uid) => {
  const response = await axios.post(baseUrl, uid);
  return response.data;
};

export default { signup };