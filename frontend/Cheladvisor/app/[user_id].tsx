import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-elements";
import axios from "axios";
import { getItem, deleteItem } from "../util/Storage";

const Home = () => {
  const { user_id } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
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
        const response = await axios.get(
          `http://localhost:3001/api/v1/users/${user_id}`
        );
        setUserData(response.data);
      } catch (error: any) {
        if (error.response) {
          await deleteItem("userId");
          router.push("/");
          setErrorMessage("Error al obtener los datos del usuario");
        } else {
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

  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Text>Hola</Text>
        <Button title="Salir" onPress={handleLogOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  logoutContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Home;
