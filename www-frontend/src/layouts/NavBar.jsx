import React from "react";
import PropTypes from "prop-types";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paper } from "@mui/material";

export default function NavBar({ value, onChange }) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#452103",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={onChange}
        sx={{
          bgcolor: "#452103",
          color: "#FFD597",
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: "#FFD597" }} />
        <BottomNavigationAction label="Map" icon={<MapIcon />} sx={{ color: "#FFD597" }} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} sx={{ color: "#FFD597" }} />
      </BottomNavigation>
    </Paper>
  );
}

NavBar.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
