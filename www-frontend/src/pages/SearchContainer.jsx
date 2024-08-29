import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Beers from "./Beers/Beers";
import Bars from "./Bars/Bars";

const SearchContainer = ({ searchQuery }) => {
  const [filter, setFilter] = useState(0); // Estado para manejar el filtro
  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const renderFilteredContent = () => {
    switch (filter) {
      case 0:
        return <Beers searchQuery={searchQuery} />;
      case 1:
        return <Bars searchQuery={searchQuery} />;
      default:
        return <Beers searchQuery={searchQuery} />;
    }
  };

  return (
    <>
      <Box sx={{ marginTop: "64px", padding: "16px", color: "#BB6B00" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            aria-label="basic tabs example"
            sx={{ marginBottom: "6px" }}
          >
            <Tab label="Beers" id="0" sx={{ color: "#BB6B00" }} />
            <Tab label="Bars" id="1" sx={{ color: "#BB6B00" }} />
            <Tab label="Item Three" id="3" sx={{ color: "#BB6B00" }} />
          </Tabs>
        </Box>
        {/*
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2, color: "#BB6B00" }}
        >
          <InputLabel sx={{ color: "#BB6B00" }}>Filter</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filter"
            sx={{ color: "#BB6B00" }}
          >
            <MenuItem sx={{ color: "#BB6B00" }} value="beers">
              Beers
            </MenuItem>
            <MenuItem
              sx={{ backgroundColor: "#210f04", color: "#BB6B00" }}
              value="bars"
            >
              Bars
            </MenuItem>
            
          </Select>
        </FormControl>
        */}
        {renderFilteredContent()}
      </Box>
    </>
  );
};

export default SearchContainer;
