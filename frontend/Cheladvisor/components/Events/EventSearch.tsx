import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import fetchEvents from "../../services/events/fetchAllEvents"; // Asegúrate de que tienes esta función
import EventCard from "./EventCard"; // Importa tu nuevo EventCard

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchEvents(); // Asegúrate de que esta función esté bien definida
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard item={item} />}
        />
      )}
    </View>
  );
};

export default Events;
