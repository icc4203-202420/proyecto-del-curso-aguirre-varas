import axios from "axios";

export default async function fetchReviewsFromUser(userId) {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios.get(`${baseURL}/users/${userId}/reviews`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
