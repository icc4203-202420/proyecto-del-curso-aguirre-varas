import React, { useState } from "react";
import { Card } from "react-native-elements";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de tener instalada esta librería
import { createAttendance } from "../../services/events/attendances"; // Importa createAttendance

interface Event {
  id: number;
  name: string;
  date: string;
  bar: { name: string } | null;
}

interface EventCardProps {
  item: Event;
  token: string;
}

const EventCard: React.FC<EventCardProps> = ({ item, token }) => {
  const [expanded, setExpanded] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  const handleAttendance = async () => {
    try {
      await createAttendance(item.id, token);
      setIsAttending((prev) => !prev); // Cambia el estado al tocarlo
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const formattedDate = new Date(item.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Card>
        <Card.Title style={styles.title}>{item.name}</Card.Title>
        <Card.Divider />
        {expanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Date: {formattedDate}</Text>
            <Text style={styles.detailText}>
              Location: {item.bar ? item.bar.name : "N/A"}
            </Text>

            <View style={styles.attendanceContainer}>
              <TouchableOpacity
                onPress={handleAttendance}
                style={[styles.attendanceButton, isAttending ? styles.attending : styles.notAttending]}
              >
                {/* Solo mostramos el check o la X */}
                {isAttending ? <Text style={styles.checkmark}>✔️</Text> : null}
              </TouchableOpacity>
              <Text style={styles.attendanceText}>Asistir al evento</Text>
            </View>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
  },
  attendanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  attendanceButton: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  attending: {
    backgroundColor: "#4CAF50",
  },
  notAttending: {
    backgroundColor: "white", 
  },
  checkmark: {
    fontSize: 20,
  },
  attendanceText: {
    fontSize: 14,
  },
});

export default EventCard;
