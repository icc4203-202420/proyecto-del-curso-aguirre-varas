import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BeerCard from "./Beer";
import BeerDetail from "./BeerDetail";
import axios from "axios";

const Beers = ({ searchQuery }) => {
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState(null);

  useEffect(() => {
    fetchBeers().then((data) => {
      setBeers(data);
    });
  }, []);

  const fetchBeers = async () => {
    const path = import.meta.env.VITE_BACKEND_URL;
    const url = `${path}/beers`;

    try {
      const response = await axios.get(url);
      //console.log(response);
      return response.data.beers;
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

  return (
    <>
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
              onClick={() => handleBeerClick(beer)} // Manejar clic
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Beers;
