import React, { useState, useEffect } from "react";
import { Stack, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BeerCard from "./Beer";
import BeerDetail from "./BeerDetail";

const Beers = ({ searchQuery }) => {
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [filter, setFilter] = useState('beers'); // Estado para manejar el filtro

  useEffect(() => {
    fetchBeers().then((data) => {
      setBeers(data);
    });
  }, []);

  const fetchBeers = async () => {
    const path = import.meta.env.VITE_BACKEND_URL;
    const url = `${path}/beers`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.beers;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBeerClick = (beer) => {
    setSelectedBeer(beer);
  };

  const handleBackClick = () => {
    setSelectedBeer(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // Puedes actualizar la llamada a fetchBeers aquí para obtener los datos filtrados
  };

  return (
    <Box sx={{ marginTop: "64px", padding: "16px", color:"#BB6B00" }}>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2, color:"#BB6B00" }}>
        <InputLabel sx={{color:"#BB6B00"}} >Filter</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
          sx={{color:"#BB6B00"}}
        >
          <MenuItem sx={{color:"#BB6B00"}} value="beers">Beers</MenuItem>
          <MenuItem sx={{backgroundColor: "#210f04", color:"#BB6B00"}} value="bars">Bars</MenuItem>
          {/* Agrega más opciones si es necesario */}
        </Select>
      </FormControl>

      {selectedBeer ? (
        <BeerDetail selectedBeer={selectedBeer} onBack={handleBackClick} />
      ) : (
        <Stack spacing={2}>
          {filteredBeers.map((beer) => (
            <BeerCard
              key={beer.id}
              name={beer.name}
              style={beer.style}
              rating={beer.rating}
              onClick={() => handleBeerClick(beer)}  // Manejar clic
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Beers;
