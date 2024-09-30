// UserDetail.jsx
import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Context from "../../context/UserContext";
import { createFriendship } from "../../services/friendships/friendships";
import useUser from "../../hooks/useUser";

const UserDetail = ({ selectedUser, onBack, friends, addFriend }) => {
  const { jwt } = useContext(Context);
  const { isAuthenticated, getUserData } = useUser();
  const [isFriend, setIsFriend] = useState(false);
  const [userData, setUserData] = useState({});

  const handleAddFriend = (eventId) => {
    createFriendship(userData.user.id, jwt, eventId, selectedUser.id)
      .then((data) => {
        addFriend(data);

        setIsFriend(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddFriendClick = () => {
    handleAddFriend();
  };

  useEffect(() => {
    if (isAuthenticated) {
      setUserData(getUserData());
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
      {!isFriend && <Button onClick={handleAddFriendClick}>Add friend</Button>}
      {isFriend && (
        <Typography>{selectedUser.handle} is your friend</Typography>
      )}
    </Box>
  );
};

export default UserDetail;
