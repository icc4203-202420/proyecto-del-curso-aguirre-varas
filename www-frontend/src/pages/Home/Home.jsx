
import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, TextField } from "@mui/material";
import NewsFromFriends from "./NewsFromFriends"; 

const Home = () => {
  const [userName, setUserName] = useState("Usuario"); 

  useEffect(() => {
    setUserName("Joaquin Varas"); 
  }, []);

  return (
    <Box sx={{ padding: "26px", marginTop: "64px" }}> 
      <Paper elevation={3} sx={{ display: "flex", alignItems: "center", padding: "16px", marginBottom: "24px" }}>
        <Avatar sx={{ bgcolor: "#4e2b0e", marginRight: "16px" }}>J</Avatar>
        <Typography variant="h6">{userName}</Typography>
      </Paper>
      <Typography>New From Friends</Typography>
      <NewsFromFriends />
    </Box>
  );
};

export default Home;

