import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import BarCard from "./Bar";
import BarDetail from "./BarDetail";
import axios from "axios";

const Bars = ({ searchQuery }) => {
  const [bars, setBars] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    fetchBars().then((data) => {
      setBars(data);
    });
  }, []);

  const fetchBars = async () => {
    const path = import.meta.env.VITE_BACKEND_URL;
    const url = `${path}/bars`;

    try {
      const response = await axios.get(url);
      //console.log(response);
      return response.data.bars;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const filteredBars = bars.filter((bar) =>
    bar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBarClick = (bar) => {
    setSelectedBar(bar);
  };

  const handleBackClick = () => {
    setSelectedBar(null);
  };

  return (
    <>
      {selectedBar ? (
        <BarDetail selectedBar={selectedBar} onBack={handleBackClick} />
      ) : (
        <Stack spacing={2}>
          {filteredBars.map((bar) => (
            <BarCard
              key={bar.id}
              name={bar.name}
              style={bar.style}
              rating={bar.rating}
              onClick={() => handleBarClick(bar)} // Manejar clic
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Bars;
