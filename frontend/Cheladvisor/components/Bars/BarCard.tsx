import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";

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
        <Card.Title>{item.name}</Card.Title>
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

export default BarCard;
