import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import { saveItem, getItem } from "../util/Storage";
import { palette } from "../assets/palette";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:3001/api/v1/login", {
        user: {
          email: email,
          password,
        },
      });
      const user = response.data.status.data.user;
      setUser(user);
      await saveItem("userId", `${user.id}`);

      router.push(`/${user.id}`);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setErrorMessage("Credenciales incorrectas");
      } else {
        setErrorMessage("Error de conexión");
      }
    }
  };

  useEffect(() => {
    const checkIsLogged = async () => {
      const userId = await getItem("userId");
      if (userId) {
        router.push(`/${userId}`);
      }
    };

    checkIsLogged();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Input
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={palette.lager}
        value={email}
        onChangeText={(text: string) => {
          setEmail(text);
          setErrorMessage("");
        }}
        leftIcon={{
          type: "font-awesome",
          name: "envelope",
          color: palette.lager,
        }}
      />
      <Input
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={palette.lager}
        value={password}
        onChangeText={(text: string) => {
          setPassword(text);
          setErrorMessage("");
        }}
        secureTextEntry
        leftIcon={{ type: "font-awesome", name: "lock", color: palette.lager }}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Button
        title="Iniciar Sesión"
        onPress={handleLogin}
        titleStyle={{ color: palette.clear }}
        buttonStyle={styles.button}
      />
      <Button
        title="Crear cuenta"
        titleStyle={{ color: palette.clear }}
        onPress={() => router.push("/register")}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: palette.background,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: palette.lager,
  },
  input: {
    color: palette.lager,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: palette.amber,
    color: palette.lager,
  },
});

export default Login;
