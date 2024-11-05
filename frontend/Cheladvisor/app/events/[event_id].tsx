import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { getItem } from "expo-secure-store";
import UploadEventPicture from "../../components/Events/UploadEvent";

import EventVideo from "../../components/Events/EventVideo";

import {
  fetchEventPictures,
  postEventPicture,
} from "../../services/event_pictures/eventPictures";

import { View, StyleSheet } from "react-native";
import ReviewList from "../../components/Reviews/ReviewList";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";

type EventPicture = {
  created_at: string;
  description: string;
  event_id: number;
  id: number;
  image_url: string;
  updated_at: string;
  user: {
    handle: string;
    id: number;
  };
  user_id: number;
};

const EventPage: React.FC = () => {
  const router = useRouter();
  const { event_id } = useLocalSearchParams();
  const userId = getItem("userId");
  const [eventPictures, setEventPictures] = useState<EventPicture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventPictures = async () => {
      try {
        const pictures = await fetchEventPictures(event_id);
        console.log(pictures);
        setEventPictures(pictures);
      } catch (error) {
        console.error("Error fetching event pictures", error);
      } finally {
        setLoading(false);
      }
    };
    getEventPictures();
  }, []);

  const uploadPicture = async () => {};

  return (
    <View>
      <View style={styles.header}>
        <Button
          type="clear"
          icon={{ name: "arrow-back", color: "black" }}
          onPress={() => {
            router.navigate(`/home/${userId}`);
          }}
        ></Button>
      </View>
      <View style={styles.container}>
        <Text>Event {event_id} Page</Text>
        <EventVideo eventId={event_id} />
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <View style={styles.container}>
          <Text style={styles.tilte1}>Pictures</Text>
          <UploadEventPicture selectedEvent={event_id} />
          {eventPictures.length === 0 && <Text>No pictures</Text>}
          <FlatList
            data={eventPictures}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.tilte1}>{item.user.handle}</Text>
                <Text>{item.description}</Text>
                <Image
                  source={{
                    uri: item.image_url,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  tilte1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tilte2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default EventPage;
