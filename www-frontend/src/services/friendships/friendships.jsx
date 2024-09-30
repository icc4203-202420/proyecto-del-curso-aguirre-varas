import axios from "axios";

export const fetchFriendships = async (userId, token) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}/friendships`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createFriendship = async (userId, token, eventId, friendId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/friendships`,
      { friend_id: friendId, event_id: eventId },
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
