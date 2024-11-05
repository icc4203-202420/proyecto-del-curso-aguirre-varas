import axios, { AxiosError } from "axios";

export default async function login(
  email,
  firstName,
  lastName,
  handle,
  password,
  passwordConfirmation
) {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;

  try {
    const response = await axios.post(`${baseURL}/signup`, {
      user: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        handle: handle,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new AxiosError(error);
  }
}
