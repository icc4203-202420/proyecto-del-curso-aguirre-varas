import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import UserCard from "./User";
import UserDetail from "./UserDetail";
import axios from "axios";

const Users = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const path = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.get(`${path}/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {selectedUser ? (
        <UserDetail selectedUser={selectedUser} onBack={handleBackClick} />
      ) : (
        <Stack spacing={2}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              handle={user.handle}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Users;
