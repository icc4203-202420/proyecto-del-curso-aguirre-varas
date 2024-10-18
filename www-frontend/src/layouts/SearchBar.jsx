import React from "react";
import { AppBar, Toolbar, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const selectedColor = "#BB6B00"; 

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#4e2b0e", 0.75),
  "&:hover": {
    backgroundColor: alpha("#4e2b0e", 0.85),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#f0e1d2",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchAppBar = ({ onSearchClick, searchQuery, onSearchChange }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useUser();
  const handleLogoutButtonClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#4e2b0e" }}>
      <Toolbar>
        <Search onClick={onSearchClick}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={onSearchChange}
          />
        </Search>
        <Button
          onClick={handleLogoutButtonClick}
          sx={{
            backgroundColor: selectedColor,
            "&:hover": {
              backgroundColor: alpha(selectedColor, 0.85),
            },
            color: "#fff",
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default SearchAppBar;
