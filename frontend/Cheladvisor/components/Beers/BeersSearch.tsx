import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";
import fetchBeers from "../../services/beers/fetchAllBeers";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Beer {
  id: number;
  name: string;
  style: string;
  avg_rating: number;
}

interface BeersProps {
  searchQuery: string;
}

const Beers: React.FC<BeersProps> = ({ searchQuery }) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBeers = async () => {
      try {
        const response = await fetchBeers();
        //console.log(response);
        setBeers(response);
      } catch (error) {
        console.error("Error fetching beers:", error);
      } finally {
        setLoading(false);
      }
    };
    getBeers();
  }, []);

  const filetredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleBeerClick = (beer: Beer) => {
    setSelectedBeer(beer);
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <FlatList
          data={filetredBeers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <Card containerStyle={{ padding: 10 }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                <Text style={{ marginBottom: 10 }}>Style: {item.style}</Text>
                <Text>Rating: {item.avg_rating}</Text>
              </Card>
            </>
          )}
        />
      )}
    </View>
  );
};

export default Beers;
