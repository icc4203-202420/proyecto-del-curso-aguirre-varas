import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Context from "../../context/UserContext";
import { createFriendship } from "../../services/friendships/friendships";
import useUser from "../../hooks/useUser";
import { fetchAllEvents } from "../../services/events/fetchAllEvents"; // Usar fetchAllEvents

const UserDetail = ({ selectedUser, onBack, friends, addFriend }) => {
  const { jwt } = useContext(Context);
  const { isAuthenticated, getUserData } = useUser();
  const [isFriend, setIsFriend] = useState(false);
  const [userData, setUserData] = useState({});
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFriend = (eventId) => {
    createFriendship(userData.user.id, jwt, eventId, selectedUser.id)
      .then((data) => {
        addFriend(data);
        setIsFriend(true);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddFriendClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    handleAddFriend(selectedEvent ? selectedEvent.id : null);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchAllEvents();
        console.log("Events:", events);
        setEventOptions(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (isAuthenticated) {
      setUserData(getUserData());
      loadEvents();
    }

    setIsFriend(friends.some((friend) => friend.friend_id === selectedUser.id));
  }, [friends, selectedUser, isAuthenticated, getUserData]);

  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4">
            {selectedUser.first_name} {selectedUser.last_name}
          </Typography>
          <Typography variant="body1">Age: {selectedUser.age}</Typography>
          <Typography variant="body1">Email: {selectedUser.email}</Typography>
          <Typography variant="body1">Handle: {selectedUser.handle}</Typography>
          <Typography variant="body1">
            Created At: {new Date(selectedUser.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            Updated At: {new Date(selectedUser.updated_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      {!isFriend && (
        <>
          <Button onClick={handleAddFriendClick} sx={{ marginTop: "16px" }}>
            Add friend
          </Button>

          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 4,
                boxShadow: 24,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Select an Event (optional)
              </Typography>
              <Autocomplete
                options={eventOptions}
                getOptionLabel={(option) => `${option.name} (ID: ${option.id})`}
                onChange={(event, newValue) => {
                  setSelectedEvent(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Event"
                    variant="outlined"
                    fullWidth
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />

              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ marginTop: "16px", width: "100%" }}
              >
                Add friend
              </Button>
            </Box>
          </Modal>
        </>
      )}
      {isFriend && (
        <Typography>{selectedUser.handle} is your friend</Typography>
      )}
    </Box>
  );
};

export default UserDetail;
