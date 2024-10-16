import React from "react";
import { Slot, Stack } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { palette } from "../assets/palette";
import { useState } from "react";

const RootLayout = () => {
  const [search, setSearch] = useState<string>("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <SafeAreaProvider>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{ backgroundColor: palette.components }}
            inputContainerStyle={{ backgroundColor: palette.components }}
          />
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default RootLayout;
