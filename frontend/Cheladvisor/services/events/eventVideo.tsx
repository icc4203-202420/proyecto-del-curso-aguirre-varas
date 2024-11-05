import axios from "axios";

export const generateEventVideo = async (eventId, token) => {
  try {
    console.log(eventId, token);
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/generate_summary`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchVideoUri = async (eventId, token) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    //console.log(response.data.event.video_url);
    return response.data.event.video_url;
  } catch (error) {
    throw new Error(error);
  }
};
