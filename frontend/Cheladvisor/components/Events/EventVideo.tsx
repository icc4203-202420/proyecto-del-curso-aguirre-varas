import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import {
  generateEventVideo,
  fetchVideoUri,
} from "../../services/events/eventVideo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItem } from "../../util/Storage";

const EventVideo = ({ eventId }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      const token = await getItem("token");
      fetchVideo(token);
    };
    loadVideo();
  }, []);

  const fetchVideo = async (token) => {
    setLoading(true);
    try {
      const uri = await fetchVideoUri(eventId, token);
      setVideoUri(uri);
    } catch (error) {
      console.error("Error fetching video URI:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    setGenerating(true);
    const token = await getItem("token");
    try {
      await generateEventVideo(eventId, token);
      Alert.alert(
        "Video generation started",
        "Please wait while we generate the video."
      );
      fetchVideo(token);
    } catch (error) {
      console.error("Error starting video generation:", error);
      Alert.alert(
        "Error",
        "An error occurred while starting video generation."
      );
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Video...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.videoContainer}>
        {videoUri ? (
          <Video
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.video}
          />
        ) : (
          <Button
            title={generating ? "Generating Video..." : "Generate Video"}
            onPress={handleGenerateVideo}
            disabled={generating}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EventVideo;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  videoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 300, // Adjust the height as needed
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    width: "100%",
  },
  addPictureText: {
    color: "blue",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});
