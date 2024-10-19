import React from "react";
import { View } from "react-native";
import { Tab } from "react-native-elements";
import { useState } from "react";
import Beers from "../components/Beers/BeersSearch"; // Asegúrate de que la ruta es correcta
import Bars from "../components/Bars/BarSearch"; // Importa el componente de Bares

function Search({ searchQuery }: { searchQuery: string }) {
  const [filter, setFilter] = useState(0);

  const handleFilterChange = (newValue: number) => {
    setFilter(newValue);
  };

  const renderFilteredContent = () => {
    switch (filter) {
      case 0:
        return <Beers searchQuery={searchQuery} />;
      case 1:
        return <Bars searchQuery={searchQuery} />; // Asegúrate de que el componente Bars acepte searchQuery
      case 2:
        return <Users searchQuery={searchQuery} />; // Asegúrate de que el componente Users acepte searchQuery
      default:
        return <Beers searchQuery={searchQuery} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab value={filter} onChange={handleFilterChange}>
        <Tab.Item title="Beers" />
        <Tab.Item title="Bars" />
        <Tab.Item title="Users" />
      </Tab>

      {renderFilteredContent()}
    </View>
  );
}

export default Search;
