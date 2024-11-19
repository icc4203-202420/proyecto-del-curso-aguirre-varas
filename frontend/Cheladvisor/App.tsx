import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import changeNavigationBarColor from "react-native-navigation-bar-color";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function App() {
  useEffect(() => {
    // Cambiar color solo en Android
    if (Platform.OS === 'android') {
      changeNavigationBarColor("#210F04", false); // Barra de navegación inferior
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#210F04" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#210F04" }, // Barra de navegación inferior
          tabBarActiveTintColor: "#FFC107", // Color activo del ícono
          tabBarInactiveTintColor: "#BB6B00", // Color inactivo del ícono
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#210F04",
    alignItems: "center",
    justifyContent: "center",
  },
});

