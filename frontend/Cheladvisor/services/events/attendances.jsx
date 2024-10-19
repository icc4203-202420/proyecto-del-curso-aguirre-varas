import axios from "axios";
import { AxiosError } from "axios";

export const fetchAttendances = async (eventId, token) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(
      `${baseURL}/events/${eventId}/attendances`,
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};

export const createAttendance = async (eventId, token) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.post(
      `${baseURL}/events/${eventId}/attendances`,
      {},
      { headers: { Authorization: `${token}` } }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new AxiosError(error);
  }
};
