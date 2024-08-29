import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import axios from "axios";
import EventCard from "../globalComponents/EventCard";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const fetchbarEvents = async (barId) => {
  const path = import.meta.env.VITE_BACKEND_URL;
  const url = `${path}/bars/${barId}/events`;

  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data.events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const BarDetail = ({ selectedBar, onBack }) => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchbarEvents(selectedBar.id).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, [selectedBar]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent sx={{ backgroundColor: "#452103" }}>
          <Typography variant="h4" color={"#BB6B00"}>
            {selectedBar.name.toUpperCase()}
          </Typography>
          <hr color="#BB6B00" />
          <Typography variant="h4" color={"#BB6B00"}>
            <StarBorderIcon />
            Next events:
          </Typography>

          {events.length > 0 &&
            events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                time={event.time}
                image={event.image || null}
              />
            ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BarDetail;
