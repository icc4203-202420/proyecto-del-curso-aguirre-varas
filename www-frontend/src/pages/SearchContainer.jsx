import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Beers from "./Beers/Beers";
import Bars from "./Bars/Bars";
import Events from "./Events/Events";
import { palette } from "../palette";
import Users from "./Users/Users";

const SearchContainer = ({ searchQuery }) => {
  const [filter, setFilter] = useState(0);
  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const renderFilteredContent = () => {
    switch (filter) {
      case 0:
        return <Beers searchQuery={searchQuery} />;
      case 1:
        return <Bars searchQuery={searchQuery} />;
      case 2:
        return <Users searchQuery={searchQuery} />;
      case 3:
        return <Events searchQuery={searchQuery} />;
      default:
        return <Beers searchQuery={searchQuery} />;
    }
  };

  const selectedColor = "#BB6B00"; // Define el color global

  return (
    <>
      <Box sx={{ marginTop: "64px", padding: "16px", color: palette.lager }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            aria-label="basic tabs example"
            sx={{ marginBottom: "6px" }}
            TabIndicatorProps={{ style: { backgroundColor: selectedColor } }} // Indicador de la pestaña activa
          >
            <Tab
              label="Beers"
              id="0"
              sx={{
                color: palette.lager,
                "&.Mui-selected": { color: selectedColor },
              }}
            />
            <Tab
              label="Bars"
              id="1"
              sx={{
                color: palette.lager,
                "&.Mui-selected": { color: selectedColor },
              }}
            />
            <Tab
              label="Users"
              id="2"
              sx={{
                color: palette.lager,
                "&.Mui-selected": { color: selectedColor },
              }}
            />
            <Tab
              label="Events"
              id="3"
              sx={{
                color: palette.lager,
                "&.Mui-selected": { color: selectedColor },
              }}
            />
          </Tabs>
        </Box>
        {renderFilteredContent()}
      </Box>
    </>
  );
};

export default SearchContainer;
