import axios from "axios";

export const fetchAllEvents = async () => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${baseURL}/events`);
    return response.data.events;
  } catch (error) {
    throw new Error(error);
  }
};
