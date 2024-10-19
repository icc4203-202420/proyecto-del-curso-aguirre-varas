import axios from "axios";

const checkIn = async (eventId, userId) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.post(`${baseURL}/events/${eventId}/checkin`, {
      userId,
    });
    return response.data.event_pictures;
  } catch (error) {
    throw new Error(error);
  }
};
