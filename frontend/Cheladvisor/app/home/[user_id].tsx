import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-elements";
import axios from "axios";
import { deleteItem } from "../../util/Storage";
import { fetchEventPictures } from "../../services/event_pictures/eventPictures"; // Asegúrate de tener la función aquí

const palette = {
  background: "#210F04",
  components: "#452103",
  amber: "#690500",
  sinfiltrar: "#934B00",
  lager: "#BB6B00",
  clear: "#FFC107",
};

const Home = () => {
  const { user_id } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await deleteItem("userId");
      await deleteItem("imageUrl");
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/users/${id}`);
      setUserData(response.data);
    } catch (error) {
      handleFetchError(error, "Error al obtener los datos del usuario");
    }
  };
  useEffect(() => {
    console.log("Reviews data:", reviews);
    console.log("Events data:", events);
  }, [reviews, events]);
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/reviews");
      console.log("Reviews response:", response.data); // Agregar log
      const latestReviews = (response.data.reviews || []).slice(0, 10);
  
      const reviewsWithBeerNames = await Promise.all(
        latestReviews.map(async (review) => ({
          ...review,
          beerName: await fetchBeerName(review.beer_id),
        }))
      );
  
      setReviews(reviewsWithBeerNames);
    } catch (error) {
      console.error("Error al obtener las reseñas", error);
    }
  };
  

  const fetchBeerName = async (beer_id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/beers/${beer_id}`);
      return response.data.name || "Unknown Beer";
    } catch (error) {
      console.error("Error al obtener el nombre de la cerveza", error);
      return "Unknown Beer";
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/events");
      const filteredEvents = response.data.events.filter((event) =>
        [1, 2, 3, 4, 5, 6].includes(event.id)
      );

      const eventsWithPictures = await Promise.all(
        filteredEvents.map(async (event) => {
          const eventPictures = await fetchEventPictures(event.id);
          return { ...event, pictures: eventPictures };
        })
      );

      setEvents(eventsWithPictures);
    } catch (error) {
      console.error("Error al obtener los eventos", error);
    }
  };

  const handleFetchError = async (error, message) => {
    await deleteItem("userId");
    await deleteItem("token");
    setErrorMessage(error.response ? message : "Error de conexión");
    router.push("/");
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchUserData(user_id);
        await fetchReviews();
        await fetchEvents();
      } catch (error) {
        console.error("Error al inicializar datos", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user_id]);

  const renderStars = (rating) => {
    const stars = [...Array(5)].map((_, index) => (
      <Text key={index} style={styles.star}>
        {index < Math.floor(rating) ? "★" : "☆"}
      </Text>
    ));
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.beerName}>{item.beerName}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
      {renderStars(item.rating)}
      <Text style={styles.userHandle}>- {item.user_handle}</Text>
    </View>
  );

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
      {item.pictures && item.pictures.length > 0 ? (
        <Image
          source={{ uri: item.pictures[0].image_url }} // Mostramos la primera imagen del evento
          style={styles.eventImage}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.eventTitle}>{item.title}</Text>
  
      {/* Mostrar el nombre del usuario que subió la imagen y a qué evento pertenece */}
      {item.pictures[0]?.uploaded_by && (
        <Text style={styles.uploadedByText}>
          Uploaded by: {item.pictures[0].uploaded_by}
        </Text>
      )}
      <Text style={styles.eventTitle}>
        Event: MyString {item.title}
      </Text>
    </View>
  );
  

  if (loading) {
    return <ActivityIndicator size="large" color={palette.clear} />;
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Button title="Log Out" onPress={handleLogOut} buttonStyle={styles.logoutButton} />
      </View>
      <Text style={styles.welcomeText}>Welcome {userData?.handle || "User"}!</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>News from Friends</Text>
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Feed</Text>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 90,
    marginBottom: 30,
    color: "#fff",
  },
  sectionContainer: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
  logoutContainer: {
    marginTop: 30,
    alignItems: "flex-end",
  },
  logoutButton: {
    backgroundColor: palette.amber,
    width: 120,
  },
  reviewContainer: {
    backgroundColor: palette.components,
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    width: 220,
    marginBottom: 10,
  },
  beerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  reviewText: {
    fontSize: 14,
    color: "#fff",
  },
  starsContainer: {
    flexDirection: "row",
  },
  star: {
    color: "#FFB800",
    fontSize: 18,
  },
  userHandle: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#fff",
  },
  eventContainer: {
    backgroundColor: palette.components,
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    width: 180,
    alignItems: "center",
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  placeholderContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  placeholderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadedByText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    fontStyle: "italic",
  },
  eventTitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});

export default Home;
