import React from "react";
import { View, Text } from "react-native";
import { Tab } from "react-native-elements";
import { useState } from "react";
import Beers from "../components/Beers/BeersSearch";

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
        return <Bars searchQuery={searchQuery} />;
      case 2:
        return <Users searchQuery={searchQuery} />;
      default:
        return <Beers searchQuery={searchQuery} />;
    }
  };
  return (
    <View>
      <Tab value={filter} onChange={setFilter}>
        <Tab.Item title="Beers" />
        <Tab.Item title="Bars" />
        <Tab.Item title="Users" />
      </Tab>

      {renderFilteredContent()}
    </View>
  );
}

export default Search;
