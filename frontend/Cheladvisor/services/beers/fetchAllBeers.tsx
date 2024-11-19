import axios from "axios";

export default async function fetchBeers() {
  const path = process.env.EXPO_PUBLIC_API_URL;
  const url = `${path}/beers`;

  try {
    const response = await axios.get(url);
    return response.data.beers;
  } catch (error) {
    console.error(error);
    return [];
  }
}
