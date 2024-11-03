import axios from "axios";
import { AxiosError } from "axios";

// Obtiene las asistencias para un evento específico
export const fetchAttendances = async (eventId, token) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(
      `${baseURL}/events/${eventId}/attendances`, // Asegúrate de que este endpoint exista
      { headers: { Authorization: `${token}` } }
    );
    return response.data; // Suponiendo que esta sea la estructura de datos esperada
  } catch (error) {
    console.error("Error fetching attendances:", error);
    throw new AxiosError(error);
  }
};

// Crea una nueva asistencia
export const createAttendance = async (eventId, token) => {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.post(
      `${baseURL}/events/${eventId}/attendances`,
      {}, // Aquí podrías enviar más datos si es necesario
      { headers: { Authorization: `${token}` } }
    );
    console.log("Attendance created:", response.data);
    return response.data; // Asegúrate de que este sea el retorno esperado
  } catch (error) {
    console.error("Error creating attendance:", error);
    throw new AxiosError(error);
  }
};
