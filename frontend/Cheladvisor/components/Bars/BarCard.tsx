import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface Bar {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface BarCardProps {
  item: Bar;
}

const BarCard: React.FC<BarCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Card>
        <Card.Title style={styles.title}>{item.name}</Card.Title>
        <Card.Divider />
        {expanded && (
          <View style={{ marginTop: 10 }}>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24, // Tamaño de fuente más grande para el nombre
    fontWeight: "bold", // Negrita para destacar
  },
});

export default BarCard;
