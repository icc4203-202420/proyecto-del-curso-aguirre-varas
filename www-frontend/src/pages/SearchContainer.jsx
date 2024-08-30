import React, { useState } from "react";
import { Box } from "@mui/material";
import { palette } from "../palette";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Beers from "./Beers/Beers";
import Bars from "./Bars/Bars";
import Users from "./Users/Users";
import Events from "./Events/Events";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SearchContainer = ({ searchQuery }) => {
  const [filter, setFilter] = useState(0);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
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
            <Tab
              component={Link}
              to="/search/beers"
              label="Beers"
              id="0"
              sx={{ color: palette.lager }}
            />
            <Tab
              component={Link}
              to="/search/bars"
              label="Bars"
              id="1"
              sx={{ color: palette.lager }}
            />
            <Tab
              component={Link}
              to="/search/users"
              label="Users"
              id="2"
              sx={{ color: palette.lager }}
            />
            <Tab
              component={Link}
              to="/search/events"
              label="Events"
              id="3"
              sx={{ color: palette.lager }}
            />
          </Tabs>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default SearchContainer;
