import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, TextField } from "@mui/material";
import NewsFromFriends from "./NewsFromFriends";
import EventCard from "../globalComponents/EventCard";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const fetchAllEvents = async () => {
  const path = import.meta.env.VITE_BACKEND_URL;
  const url = `${path}/events`;

  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data.events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home = () => {
  const [userName, setUserName] = useState("Usuario");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setUserName("Joaquin Varas");
    fetchAllEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <Box sx={{ padding: "26px", marginTop: "64px" }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#f0e1d2",
        }}
      >
        <Avatar sx={{ bgcolor: "#4e2b0e", marginRight: "16px" }}>J</Avatar>
        <Typography variant="h6">{userName}</Typography>
      </Paper>

      <Box sx={{ marginTop: "6px", marginBottom: "24px" }}>
        <Typography variant="h4" sx={{ marginBottom: "6px" }}>
          <MailOutlineIcon /> New From Friends
        </Typography>
        <NewsFromFriends />
      </Box>

      <Typography variant="h4">
        <StarBorderIcon />
        Events
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 2,
          flex: 1,
          marginTop: "16px", 
        }}
      >
        {events &&
          events.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              date={event.date}
              image={event.image_url || null}
              description={event.description}
              sx={{ marginBottom: "16px" }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Home;
