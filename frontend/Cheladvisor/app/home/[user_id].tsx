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

  const getBeerName = async (beer_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/api/v1/beers/${beer_id}`);
      return response.data.name;
    } catch (error) {
      console.error("Error al obtener el nombre de la cerveza", error);
      return "Unknown Beer";
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/api/v1/events");
      const filteredEvents = response.data.events.filter((event) =>
        [1, 2, 3, 4].includes(event.id)
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error al obtener los eventos", error);
    }
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const userResponse = await axios.get(`http://127.0.0.1:3001/api/v1/users/${user_id}`);
        setUserData(userResponse.data);

        const reviewResponse = await axios.get("http://127.0.0.1:3001/api/v1/reviews");
        const allReviews = Array.isArray(reviewResponse.data.reviews) ? reviewResponse.data.reviews : [];
        const latestReviews = allReviews.slice(0, 10);

        const reviewsWithBeerNames = await Promise.all(
          latestReviews.map(async (review) => {
            const beerName = await getBeerName(review.beer_id);
            return { ...review, beerName };
          })
        );

        setReviews(reviewsWithBeerNames);
        await getEvents();
      } catch (error) {
        if (error.response) {
          await deleteItem("userId");
          await deleteItem("token");
          router.push("/");
          setErrorMessage("Error al obtener los datos del usuario");
        } else {
          await deleteItem("userId");
          await deleteItem("token");
          setErrorMessage("Error de conexión");
        }
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [user_id]);

  if (loading) {
    return <ActivityIndicator size="large" color={palette.clear} />;
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMessage || "Error desconocido"}</Text>
      </View>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Text key={index} style={styles.star}>★</Text>
        ))}
        {halfStars > 0 && <Text style={styles.star}>☆</Text>}
        {[...Array(emptyStars)].map((_, index) => (
          <Text key={index} style={styles.star}>☆</Text>
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.beerName}>{item.beerName}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
      {renderStars(parseFloat(item.rating))}
      <Text style={styles.userHandle}>- {item.user_handle}</Text>
    </View>
  );

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
      {item.image_url ? (
        <Image
          source={{ uri: item.image_url }}
          style={styles.eventImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.eventTitle}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Button
          title="Log Out"
          onPress={handleLogOut}
          buttonStyle={styles.logoutButton}
        />
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
          contentContainerStyle={styles.reviewsContainer}
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
          contentContainerStyle={styles.eventsContainer}
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
  reviewsContainer: {
    paddingHorizontal: 10,
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
  eventsContainer: {
    paddingHorizontal: 10,
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
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#333", // Color de fondo mientras se carga la imagen
  },
  placeholderContainer: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#666", // Fondo del marcador de posición
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Home;
