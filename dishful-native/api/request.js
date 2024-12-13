import axios from "axios";

const API_BASE_URL = "https://dishful-server.onrender.com/api/v1";

export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  token = null
) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    // console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || new Error("Network error");
  }
};

/*
EXAMPLE USAGE
import apiRequest from "../utils/api";

// Example call
const fetchRecipes = async () => {
  try {
    const data = await apiRequest("/recipes", "GET", null, "your-auth-token");
    console.log(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};
*/
