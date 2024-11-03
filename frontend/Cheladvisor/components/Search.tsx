// src/screens/Search.tsx

import React, { useState } from "react";
import { View } from "react-native";
import { Tab } from "react-native-elements";
import Beers from "../components/Beers/BeersSearch";
import Bars from "../components/Bars/BarSearch";
import Users from "../components/Users/UserSearch";
import Events from "../components/Events/EventSearch";

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
      case 3:
        return <Events searchQuery={searchQuery} />;
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
        <Tab.Item title="Events" />
      </Tab>

      {renderFilteredContent()}
    </View>
  );
}

export default Search;
