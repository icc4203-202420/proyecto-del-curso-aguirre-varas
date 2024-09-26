import axios from "axios";

export default async function fetchReviewsFromBeer(BeerId) {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await axios.get(`${baseURL}/beers/${BeerId}/reviews`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
