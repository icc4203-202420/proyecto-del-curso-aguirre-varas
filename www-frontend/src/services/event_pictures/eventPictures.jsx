import axios from "axios";

export const fetchEventPictures = async (eventId) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
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
      `${import.meta.env.VITE_BACKEND_URL}/events/${eventId}/event_pictures`,
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
