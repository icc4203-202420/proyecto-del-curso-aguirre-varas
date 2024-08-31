import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const EventDetail = ({ selectedEvent, onBack }) => {
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
              Start Date: {new Date(selectedEvent.start_date).toLocaleDateString()}
            </Typography>
          )}
          {selectedEvent.end_date && (
            <Typography variant="body1">
              End Date: {new Date(selectedEvent.end_date).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetail;
