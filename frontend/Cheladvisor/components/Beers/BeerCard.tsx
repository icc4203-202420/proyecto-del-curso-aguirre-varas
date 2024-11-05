import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";
import { Slider } from '@react-native-community/slider';

interface Beer {
  id: number;
  name: string;
  style: string;
  avg_rating: number;
}

interface BeerCardProps {
  item: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(item.avg_rating); 

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Card>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>Style: {item.style}</Text>
        <Text>Rating: {item.avg_rating}</Text>
        
        {expanded && (
          <View style={{ marginTop: 10 }}>
            <Text>Rate this beer:</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={rating}
              onValueChange={(value) => setRating(value)}
              minimumTrackTintColor="#1FB28A"
              maximumTrackTintColor="#D3D3D3"
            />
            <Text style={{ marginTop: 10 }}>Your Rating: {rating}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default BeerCard;
