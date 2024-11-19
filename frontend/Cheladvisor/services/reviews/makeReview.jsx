import axios, { AxiosError } from "axios";

export default async function makeReview(review, userId) {
  const baseURL = process.env.EXPO_PUBLIC_API_URL;

  try {
    const response = await axios.post(`${baseURL}/reviews`, {
      review: {
        text: review.text,
        rating: review.rating,
        beer_id: review.beer_id,
      },
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    throw new AxiosError(error);
  }
}
