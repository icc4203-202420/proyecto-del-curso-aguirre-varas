import React from "react";

import { Card } from "react-native-elements";
import { Text, Button } from "react-native";
import { useRouter } from "expo-router";

interface Beer {
  id: number;
  name: string;
  style: string;
  avg_rating: number;
}

export default function BeerCard(item: Beer) {
  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>Style: {item.style}</Text>
      <Text>Rating: {item.avg_rating}</Text>
    </Card>
  );
}
