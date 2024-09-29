import React from "react";
import PropTypes from "prop-types";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

const selectedColor = "#BB6B00"; 

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
        <BottomNavigationAction
          component={Link}
          to="/"
          value={0}
          label="Home"
          icon={<HomeIcon />}
          sx={{
            color: value === 0 ? selectedColor : "#FFD597",
            "&.Mui-selected": {
              color: selectedColor,
            },
            "&:hover": {
              color: selectedColor,
            },
            "&:active": {
              color: selectedColor,
            },
            "& .MuiTouchRipple-root": {
              color: selectedColor,
            },
          }}
        />
        <BottomNavigationAction
          component={Link}
          value={1}
          to="/map"
          label="Map"
          icon={<MapIcon />}
          sx={{
            color: value === 1 ? selectedColor : "#FFD597",
            "&.Mui-selected": {
              color: selectedColor,
            },
            "&:hover": {
              color: selectedColor,
            },
            "&:active": {
              color: selectedColor,
            },
            "& .MuiTouchRipple-root": {
              color: selectedColor,
            },
          }}
        />
        <BottomNavigationAction
          component={Link}
          value={2}
          to="/account"
          label="Account"
          icon={<AccountCircleIcon />}
          sx={{
            color: value === 2 ? selectedColor : "#FFD597",
            "&.Mui-selected": {
              color: selectedColor,
            },
            "&:hover": {
              color: selectedColor,
            },
            "&:active": {
              color: selectedColor,
            },
            "& .MuiTouchRipple-root": {
              color: selectedColor,
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

NavBar.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
