import axios from "axios";

export const fetchBarEvents = async (barId) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${baseURL}/bars/${barId}/events`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
