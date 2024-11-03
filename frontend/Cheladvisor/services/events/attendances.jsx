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


export const createAttendance = async (eventId: number, token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/v1/events/${eventId}/attendances`, // Asegúrate de que esta URL sea correcta
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token aquí
        },
      }
    );
    return response.data; // Procesa la respuesta según sea necesario
  } catch (error) {
    throw new Error(`Error marking attendance: ${error}`);
  }
};
