import React, { useState } from "react";
import { Box } from "@mui/material";
import { palette } from "../palette"; 
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Beers from "./Beers/Beers";
import Bars from "./Bars/Bars";
import Users from "./Users/Users"
import Events from "./Events/Events"; 

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
        return <Users searchQuery={searchQuery}/>;
      case 3:
        return <Events searchQuery={searchQuery} />; 
      default:
        return <Beers searchQuery={searchQuery} />;
    }
  };

  return (
    <>
      <Box sx={{ marginTop: "64px", padding: "16px", color: palette.lager }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            aria-label="basic tabs example"
            sx={{ marginBottom: "6px" }}
          >
            <Tab label="Beers" id="0" sx={{ color: palette.lager }} />
            <Tab label="Bars" id="1" sx={{ color: palette.lager }} />
            <Tab label="Users" id="2" sx={{ color: palette.lager }} />
            <Tab label="Events" id="3" sx={{ color: palette.lager }} /> 
          </Tabs>
        </Box>
        {renderFilteredContent()}
      </Box>
    </>
  );
};

export default SearchContainer;
