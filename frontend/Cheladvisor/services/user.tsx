import axios, { AxiosError } from "axios";

export default async function getUserData(user_id: string | string[]) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/users/${user_id}`);
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
}
