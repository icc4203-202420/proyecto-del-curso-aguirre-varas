import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import axios from "axios";
import EventCard from "../globalComponents/EventCard";
import BeerCard from "../Beers/Beer"; // Ruta actualizada

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

const fetchBarBeers = async (barId) => {
  const path = import.meta.env.VITE_BACKEND_URL;
  const url = `${path}/bars/${barId}/beers`; // Supongo que esta es la ruta para obtener las cervezas del bar.

  try {
    const response = await axios.get(url);
    return response.data.beers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const BarDetail = ({ selectedBar, onBack }) => {
  const [events, setEvents] = React.useState([]);
  const [beers, setBeers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [visibleBeersCount, setVisibleBeersCount] = React.useState(4); // Estado para controlar cuántas cervezas se muestran.

  React.useEffect(() => {
    // Fetch de eventos del bar
    fetchbarEvents(selectedBar.id).then((data) => {
      setEvents(data);
      setLoading(false);
    });
    
    // Fetch de cervezas del bar
    fetchBarBeers(selectedBar.id).then((data) => {
      setBeers(data);
    });
  }, [selectedBar]);

  // Maneja el scroll infinito
  const handleLoadMoreBeers = () => {
    setVisibleBeersCount((prevCount) => prevCount + 4); // Incrementa de 4 en 4
  };

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

          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                time={event.time}
                image={event.image || null}
              />
            ))
          ) : (
            <Typography variant="body1" color="#BB6B00">
              No events available.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Sección de Cervezas del Bar */}
      <Typography variant="h4" color={"#BB6B00"} sx={{ marginTop: "24px" }}>
        Beers Available:
      </Typography>

      {/* Grid de Cervezas con Scroll Infinito */}
      <Box
        sx={{
          marginTop: "16px",
          maxHeight: "400px", // Altura máxima del contenedor de scroll
          overflowY: "auto",  // Habilita el scroll vertical
        }}
        onScroll={(e) => {
          const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
          if (bottom) handleLoadMoreBeers(); // Cargar más cervezas al llegar al final
        }}
      >
        <Grid container spacing={2}>
          {beers.slice(0, visibleBeersCount).map((beer) => (
            <Grid item xs={12} sm={6} md={3} key={beer.id}>
              <BeerCard
                name={beer.name}
                style={beer.style}
                rating={beer.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BarDetail;
