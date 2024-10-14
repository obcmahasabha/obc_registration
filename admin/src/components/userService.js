// src/services/userService.js
import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const API_URL=`${BASE_URL}/api/users/getAllUsers`; //  API base URL

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
