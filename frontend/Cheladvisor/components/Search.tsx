import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Tab } from "react-native-elements";
import Beers from "../components/Beers/BeersSearch";
import Bars from "../components/Bars/BarSearch";
import Users from "../components/Users/UserSearch";
import Events from "../components/Events/EventSearch";
import { palette } from "../assets/palette";

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
    <View style={styles.container}>
      <Tab
        value={filter}
        onChange={handleFilterChange}
        indicatorStyle={{ backgroundColor: "white" }} // Indicador blanco
      >
        <Tab.Item
          title="Beers"
          titleStyle={styles.tabTitle}
          buttonStyle={styles.tabButton}
        />
        <Tab.Item
          title="Bars"
          titleStyle={styles.tabTitle}
          buttonStyle={styles.tabButton}
        />
        <Tab.Item
          title="Users"
          titleStyle={styles.tabTitle}
          buttonStyle={styles.tabButton}
        />
        <Tab.Item
          title="Events"
          titleStyle={styles.tabTitle}
          buttonStyle={styles.tabButton}
        />
      </Tab>

      {renderFilteredContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background, 
  },
  tabTitle: {
    color: "white",
    fontSize:13,
  },
  tabButton: {
    backgroundColor: palette.amber, 
  },
});

export default Search;
