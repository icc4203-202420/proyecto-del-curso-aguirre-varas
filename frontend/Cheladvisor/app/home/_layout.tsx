import { Slot } from "expo-router";
import React from "react";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { palette } from "../../assets/palette";

function _layout() {
  const [search, setSearch] = useState<string>("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={{ backgroundColor: palette.components }}
        inputContainerStyle={{ backgroundColor: palette.components }}
      />
      <Slot />
    </>
  );
}

export default _layout;
