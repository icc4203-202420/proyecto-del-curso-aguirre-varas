import React from "react";
import { useState, useEffect } from "react";
import BeerCard from "./Beer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";

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

const Beers = () => {
  const [beers, setBeers] = useState([]);
  useEffect(() => {
    fetchBeers().then((data) => {
      setBeers(data);
    });
  }, []);

  return (
    <div>
      <Stack sx={{ marginTop: 4 }}>
        {beers.map((beer) => (
          <BeerCard
            key={beer.id}
            name={beer.name}
            style={beer.style}
            rating={beer.rating}
            sx={{ marginTop: "4px" }}
          />
        ))}
      </Stack>
    </div>
  );
};

export default Beers;
