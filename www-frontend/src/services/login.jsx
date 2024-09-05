import axios, { AxiosError } from "axios";

//returns user details
export default async function login(email, password) {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios.post(`${baseURL}/login`, {
      user: {
        email: email,
        password: password,
      },
    });
    return response;
  } catch (error) {
    throw new AxiosError(error);
  }
}
