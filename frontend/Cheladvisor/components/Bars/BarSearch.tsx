import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import BarCard from "./BarCard"; // Asegúrate de que la ruta es correcta

interface Bar {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address_id: number;
}

interface BarsProps {
  searchQuery: string;
}

const Bars: React.FC<BarsProps> = ({ searchQuery }) => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredBars, setFilteredBars] = useState<Bar[]>([]);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch("YOUR_API_URL_HERE"); // Cambia esto por tu URL real
        if (!response.ok) {
          throw new Error("Failed to fetch bars");
        }
        const data = await response.json();
        setBars(data.bars);
        setFilteredBars(data.bars);
      } catch (error) {
        console.error("Error fetching bars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, []);

  useEffect(() => {
    const filtered = bars.filter((bar) =>
      bar.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBars(filtered);
  }, [searchQuery, bars]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredBars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BarCard item={item} />} // Usando BarCard aquí
        />
      )}
    </View>
  );
};

export default Bars;
