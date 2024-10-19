import axios from "axios";

export const fetchBarEvents = async (barId) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${baseURL}/bars/${barId}/events`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
