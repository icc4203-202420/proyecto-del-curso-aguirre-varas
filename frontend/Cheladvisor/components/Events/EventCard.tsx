import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity, View } from "react-native";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
}

interface EventCardProps {
  item: Event;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Card>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>Description: {item.description}</Text>
        <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
        
        {expanded && (
          <View style={{ marginTop: 10 }}>
            <Text>Friends Attending:</Text>
            {/* Aquí puedes mostrar la lista de amigos que asistirán */}
            {/* Por ejemplo, si tienes un estado o prop que contenga amigos */}
            {/* friendsList podría ser un array de nombres de amigos */}
            {/* friendsList.map(friend => <Text key={friend.id}>{friend.name}</Text>) */}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default EventCard;
