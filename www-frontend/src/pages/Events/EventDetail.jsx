import React, { useContext } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { postEventPicture } from "../../services/event_pictures/eventPictures";
import EventPictures from "./EventPictures";
import Context from "../../context/UserContext";
import {
  fetchAttendances,
  createAttendance,
} from "../../services/events/attendances";
import useUser from "../../hooks/useUser";
import UploadEventPicture from "./uploadEventPicture";

const EventDetail = ({ selectedEvent, onBack }) => {
  const { isAuthenticated, getUserData } = useUser();
  const { jwt } = useContext(Context);
  console.log(jwt);

  const [attendances, setAttendances] = useState([]);
  const [isAttending, setIsAttending] = useState(false);
  const [userData, setUserData] = useState({});

  const [hasUpdatedPhoto, setUpdatedPhoto] = useState(false);
  const handleClick = () => {
    setIsAttending(!isAttending);
    handleAttendance();
  };

  const handleAttendance = async () => {
    try {
      if (isAuthenticated) {
        const response = await createAttendance(selectedEvent.id, jwt);
        console.log(response);
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAttendances = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const response = await fetchAttendances(selectedEvent.id, jwt);
        setAttendances(response);
        console.log("iubiubiu", response);
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated, jwt, selectedEvent.id]);

  useEffect(() => {
    if (isAuthenticated) {
      setUserData(getUserData());
      getAttendances();
    }
  }, [getAttendances, isAuthenticated, getUserData]);

  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4">{selectedEvent.name}</Typography>
          <Typography variant="h6">{selectedEvent.description}</Typography>
          <Typography variant="body1">
            Date: {new Date(selectedEvent.date).toLocaleDateString()}
          </Typography>
          {selectedEvent.start_date && (
            <Typography variant="body1">
              Start Date:{" "}
              {new Date(selectedEvent.start_date).toLocaleDateString()}
            </Typography>
          )}
          {selectedEvent.end_date && (
            <Typography variant="body1">
              End Date: {new Date(selectedEvent.end_date).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>
      {isAttending ? (
        <Typography variant="h6">You are attending this event!</Typography>
      ) : (
        <>
          <Typography variant="h6">You are not attending this event</Typography>
          <Button onClick={handleClick}>Attend this event!</Button>
        </>
      )}

      <Typography variant="h6">Attendances</Typography>
      <ul>
        {attendances &&
          attendances.map((attendance) => (
            <>
              <Typography>user</Typography>
              <li key={attendance.id}>{attendance.user_id}</li>
            </>
          ))}

        {attendances.length === 0 && <li>No attendances yet</li>}
      </ul>
      <Typography variant="h6">Pictures From This Event </Typography>

      <UploadEventPicture selectedEvent={selectedEvent} jwt={jwt} />
      <EventPictures eventId={selectedEvent.id} />
    </Box>
  );
};

export default EventDetail;
