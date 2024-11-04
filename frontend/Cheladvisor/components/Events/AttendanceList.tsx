import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  fetchAttendances,
  createAttendance,
} from "../../services/events/attendances";
import { checkIn } from "../../services/events/checkIn";
import { getItem } from "../../util/Storage";

type Attendance = {
  id: number;
  user_handle: string;
  check_in_time: string;
};

function AttendanceList({
  user_id,
  event_id,
}: {
  user_id: string;
  event_id: string;
}) {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [userCheckedIn, setUserCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getItem("token");
        const attendanceList = await fetchAttendances(event_id, token);
        const isUserCheckedIn = attendanceList.some(
          (attendance) => attendance.user_id === parseInt(user_id)
        );
        setUserCheckedIn(isUserCheckedIn);
        setAttendances(attendanceList);
      } catch (error) {
        setErrorMessage("Error fetching attendance list");
        console.error("Error fetching attendance list", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [event_id, user_id]);

  const handleCheckIn = async () => {
    try {
      console.log("dwadwa");
      const token = await getItem("token");
      console.log(token);
      await createAttendance(parseInt(event_id), token);
      await checkIn(event_id, user_id);
      setUserCheckedIn(true);
      // Refetch attendance list after check-in
      const updatedList = await fetchAttendances(event_id, token);
      setAttendances(updatedList);
    } catch (error) {
      setErrorMessage("Error during check-in");
      console.error("Error during check-in", error);
    }
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}
      {!loading && !errorMessage && (
        <>
          {!userCheckedIn ? (
            <Button title="Check-in" onPress={handleCheckIn} />
          ) : (
            <Text>You have checked in</Text>
          )}
          <View>
            <Text style={styles.title}>Attendance List</Text>
            {attendances.length === 0 ? (
              <Text>No attendees yet</Text>
            ) : (
              attendances.map((attendance) => (
                <View key={attendance.id} style={styles.attendance}>
                  <Text>@{attendance.user_handle}</Text>
                  <Text>Checked in at: {attendance.check_in_time}</Text>
                </View>
              ))
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  attendance: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f0e68c",
    borderRadius: 10,
  },
});

export default AttendanceList;
