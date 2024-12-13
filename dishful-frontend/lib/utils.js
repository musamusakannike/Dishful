import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// const API_URL = "http://localhost:8080/api/v1";
const API_URL = "https://dishful.onrender.com/api/v1";

export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);

    // Log the full response object and its status for debugging
    console.log("Full Response Object:", response);
    console.log("Status:", response.status);

    // Check if the response is OK before trying to parse JSON
    if (!response.ok) {
      // Log the text response when there's an error for more details
      const errorText = await response.json();
      console.log("Error Response Text:", errorText);
      throw new Error(errorText?.message || "An error occurred");
    }

    const data = await response.json();
    console.log("Response Data:", JSON.stringify(data, null, 2)); // Log parsed JSON data
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};
