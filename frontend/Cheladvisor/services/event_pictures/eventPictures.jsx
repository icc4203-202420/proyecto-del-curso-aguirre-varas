import axios from "axios";

export const fetchEventPictures = async (eventId) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.get(
      `${baseUrl}/events/${eventId}/event_pictures`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postEventPicture = async (
  eventId,
  picture,
  token,
  description
) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/events/${eventId}/event_pictures`,
      { event_picture: { description, image_base64: picture } },
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
