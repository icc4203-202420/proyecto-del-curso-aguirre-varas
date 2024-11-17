import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { getItem } from "expo-secure-store";
import UploadEventPicture from "../../components/Events/UploadEvent";

import {
  fetchEventPictures,
  postEventPicture,
} from "../../services/event_pictures/eventPictures";

import { View, StyleSheet } from "react-native";
import ReviewList from "../../components/Reviews/ReviewList";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { palette } from "../../assets/palette";

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
    <ScrollView style={styles.scroll}>
      <View style={styles.header}>
        <Button
          type="clear"
          icon={{ name: "arrow-back", color: "white" }}
          onPress={() => {
            router.navigate(`/home/${userId}`);
          }}
        ></Button>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Event {event_id} Page</Text>
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <View style={styles.container}>
          <Text style={styles.tilte1}>Pictures</Text>
          <UploadEventPicture selectedEvent={event_id} />
          {eventPictures.length === 0 && <Text style={styles.body}>No pictures</Text>}
          <FlatList
            data={eventPictures}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.body}>{item.description}</Text>
                <Text style={styles.body}>{item.user.handle}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: palette.background,
    padding: 10,
  },
  body:{
    color:"white",
  },
  title:{
    fontSize:32,
    marginVertical:15,
    color:palette.lager,
  },
  tilte1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color:"white",
  },
  tilte2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  scroll:{
    backgroundColor:palette.background,
  }
});

export default EventPage;
