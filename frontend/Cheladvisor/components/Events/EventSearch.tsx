// src/components/Events/EventSearch.tsx

import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import EventCard from "./EventCard";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

interface EventsProps {
  searchQuery: string;
  token: string; // Añadido: token de autenticación
}

const Events: React.FC<EventsProps> = ({ searchQuery }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events);
        setFilteredEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard item={item} />}
        />
      )}
    </View>
  );
};

export default Events;
