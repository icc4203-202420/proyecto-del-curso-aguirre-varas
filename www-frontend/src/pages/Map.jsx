import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBDIFtO97enRHhaQtYRNgRPSTAUEfeFfkE", // Reemplaza con tu API key de Google
    libraries,
  });

  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [bars, setBars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Obtener la ubicación actual del navegador
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null // Manejar error si el usuario no da permiso
    );
  }, []);

  const handleSearch = useCallback(() => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location,
      radius: "5000", // Radio de búsqueda en metros
      query: searchTerm,
      type: ["bar"],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setBars(results);
      }
    });
  }, [location, searchTerm]);

  if (loadError) return <div>Error cargando el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Map View
      </Typography>

      <TextField
        label="Buscar Bar"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={location}
        options={options}
      >
        <Marker position={location} />
        {bars.map((bar) => (
          <Marker
            key={bar.place_id}
            position={{
              lat: bar.geometry.location.lat(),
              lng: bar.geometry.location.lng(),
            }}
            title={bar.name}
          />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default Map;
