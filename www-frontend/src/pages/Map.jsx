import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, TextField, Button, MenuItem, Paper } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

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
    googleMapsApiKey: "AIzaSyBDIFtO97enRHhaQtYRNgRPSTAUEfeFfkE", 
    libraries,
  });

  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [bars, setBars] = useState([]); // Almacenar todos los bares
  const [filteredBars, setFilteredBars] = useState([]); // Bares filtrados
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Sugerencias desplegables
  const [selectedBar, setSelectedBar] = useState(null); // Bar seleccionado

  // Obtener la ubicación del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
      }
    );
  }, []);

  // Obtener los bares desde la API
  useEffect(() => {
    axios.get("http://127.0.0.1:3001/api/v1/bars")
      .then((response) => {
        setBars(response.data.bars); // Guardar bares obtenidos
        setFilteredBars(response.data.bars); // Inicializar los bares filtrados
      })
      .catch((error) => {
        console.error("Error al obtener bares:", error);
      });
  }, []);

  // Manejar la búsqueda y sugerencias
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSuggestions([]);
      setFilteredBars(bars); // Mostrar todos los bares si no hay término de búsqueda
    } else {
      const filtered = bars.filter((bar) =>
        bar.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  // Cuando seleccionas un bar de las sugerencias
  const handleSuggestionClick = (bar) => {
    setSearchTerm(bar.name);
    setSuggestions([]);
    setFilteredBars([bar]); // Filtrar solo el bar seleccionado
    setSelectedBar(bar); // Establecer el bar seleccionado para centrar el mapa
  };

  if (loadError) return <div>Error cargando el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Map View
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Input con fondo blanco */}
        <TextField
          label="Buscar Bar"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: "white",  // Fondo blanco
            marginBottom: 2,
          }}
        />

        {/* Lista desplegable de sugerencias */}
        {suggestions.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              width: "100%",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((bar) => (
              <MenuItem key={bar.id} onClick={() => handleSuggestionClick(bar)}>
                {bar.name}
              </MenuItem>
            ))}
          </Paper>
        )}
      </Box>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={selectedBar ? 16 : 14} // Acercar más si un bar está seleccionado
        center={selectedBar ? { lat: selectedBar.latitude, lng: selectedBar.longitude } : location} // Centrar en el bar seleccionado o en la ubicación del usuario
        options={options}
      >
        {/* Marcador de la ubicación del usuario */}
        <Marker position={location} />

        {/* Agregar marcadores de bares filtrados */}
        {filteredBars.length > 0 ? (
          filteredBars.map((bar) => (
            <Marker
              key={bar.id}
              position={{
                lat: bar.latitude,
                lng: bar.longitude,
              }}
              title={bar.name}
            />
          ))
        ) : (
          <Typography variant="body1">No hay bares disponibles.</Typography>
        )}
      </GoogleMap>
    </Box>
  );
};

export default Map;

