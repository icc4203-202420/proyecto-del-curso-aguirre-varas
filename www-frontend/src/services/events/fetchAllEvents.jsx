import axios from "axios";

export const fetchAllEvents = async () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${baseURL}/events`);
    return response.data.events;
  } catch (error) {
    throw new Error(error);
  }
};
