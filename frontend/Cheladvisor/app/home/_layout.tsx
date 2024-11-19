import { Slot, useRouter, usePathname } from "expo-router";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/base";
import { palette } from "../../assets/palette";
import Search from "../../components/Search";

function _layout() {
  const [search, setSearch] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(false); // Estado para controlar la visibilidad de la flecha
  const router = useRouter();
  const pathname = usePathname();  // Obtiene la ruta actual

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowBackButton(true); // Muestra la flecha cuando el layout es tocado
  };

  const handleCancelSearch = () => {
    setIsSearchFocused(false);
    setShowBackButton(false); // Oculta la flecha cuando el layout no está tocado
  };

  // Verificar si la ruta es la principal '/home'
  const isHomePage = pathname === "/home";

  return (
    <>
      <View style={styles.container}>
        {!isHomePage && showBackButton && ( // Solo mostrar la flecha si no estamos en '/home' y showBackButton es true
          <Button
            type="clear"
            icon={{ name: "arrow-back", color: "black" }}
            onPress={() => router.back()}
            containerStyle={styles.buttonContainer}
          />
        )}

        <SearchBar
          cancelButtonProps={{}}
          cancelButtonTitle="Cancel"
          onCancel={handleCancelSearch}
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={{ backgroundColor: palette.components }}
          onPress={handleSearchFocus} // Cuando el SearchBar es tocado, muestra la flecha
          showCancel={true}
          onClear={() => {
            setSearch("");
            handleCancelSearch(); // Cancelar la búsqueda y ocultar la flecha
          }}
        />
      </View>

      {isSearchFocused && <Search searchQuery={search} />}
      {!isSearchFocused && <Slot />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.components,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginRight: 10,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: palette.components,
  },
});

export default _layout;

