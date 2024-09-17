import axios from "axios";

const checkIn = async (eventId, userId) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.post(`${baseURL}/events/${eventId}/checkin`, {
      userId,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
