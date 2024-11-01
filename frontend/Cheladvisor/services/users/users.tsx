import axios from "axios";

export const fetchUsers = async () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
