import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-elements";
import axios from "axios"; // Asegúrate de tener axios disponible
import { getItem, deleteItem } from "../../util/Storage";
import userService from "../../services/user";

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
  const [reviews, setReviews] = useState([]); // Para almacenar las reseñas
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

  useEffect(() => {
    const initData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/v1/reviews");
        console.log(response.data);
        
        // Extraemos las reseñas de la respuesta de la API
        const allReviews = response.data.reviews || [];

        // Limitar a las últimas 10 reseñas
        const latestReviews = allReviews.slice(0, 10);
        setReviews(latestReviews);
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  }

  // Función para renderizar las estrellas según la calificación
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Número de estrellas completas
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Determina si hay una estrella medio llena
    const emptyStars = 5 - fullStars - halfStars; // Resto de las estrellas vacías

    // Crea una cadena de estrellas con las correspondientes estrellas completas, medianas y vacías
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

  // Componente para cada reseña
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewText}>{item.text}</Text>
      {renderStars(parseFloat(item.rating))}
      <Text style={styles.userHandle}>- {item.user_handle}</Text>
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

      <Text style={styles.welcomeText}>Welcome {userData?.handle}!</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>News from Friends</Text>
        
        {/* FlatList horizontal para mostrar las últimas 10 reseñas */}
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
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
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
    marginBottom: 10,
  },
  logoutContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: palette.lager,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reviewsContainer: {
    marginTop: 10,
    paddingBottom: 20,
  },
  reviewContainer: {
    backgroundColor: palette.components,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    width: 250,
  },
  reviewText: {
    color: "#fff",
    fontSize: 16,
  },
  userHandle: {
    marginTop: 5,
    color: "#bbb",
    fontSize: 14,
    textAlign: "right",
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    color: "#ffc107", // Color amarillo para las estrellas
    fontSize: 18,
  },
});

export default Home;

