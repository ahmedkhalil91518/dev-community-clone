import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

export const socialLogin = async (data) => {
    const response = await axios.post(baseUrl + "/social", data);
    console.log(response.data);
    return response.data;
};