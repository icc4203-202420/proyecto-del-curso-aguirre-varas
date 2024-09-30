import React, { useState, useEffect } from "react";
import { Stack, Box, Button } from "@mui/material";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import axios from "axios";

const Events = ({ searchQuery }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  const fetchEvents = async () => {
    const path = import.meta.env.VITE_BACKEND_URL;
    const url = `${path}/events`;

    try {
      const response = await axios.get(url);
      return response.data.events;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBackClick = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      {selectedEvent ? (
        <EventDetail selectedEvent={selectedEvent} onBack={handleBackClick} />
      ) : (
        <Stack spacing={2}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              description={event.description}
              date={event.date}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Events;
