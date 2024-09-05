import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SearchAppBar from "./layouts/SearchBar";
import NavBar from "./layouts/NavBar";
import Home from "./pages/Home/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import "./App.css"; // Importa el archivo de estilos globales
import SearchContainer from "./pages/SearchContainer";

import Login from "./pages/Login/Login";

import Beers from "./pages/Beers/Beers";
import Bars from "./pages/Bars/Bars";
import Users from "./pages/Users/Users";
import Events from "./pages/Events/Events";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
import useUser from "./hooks/useUser";

function App() {
  const { isAuthenticated } = useUser();

  const [currentView, setCurrentView] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Nuevo estado de búsqueda

  const navigate = useNavigate();

  const handleNavBarChange = (event, newValue) => {
    setCurrentView(newValue);
  };

  const handleSearchClick = () => {
    if (currentView !== 3) {
      navigate("/search");
      setCurrentView(3);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Actualizar búsqueda global
  };

  return (
    <>
      <UserContextProvider>
        <CssBaseline />

        <div className="container">
          <SearchAppBar
            onSearchClick={handleSearchClick}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<Map />} />
            <Route path="/account" element={<Profile />} />
            <Route
              path="/search"
              element={<SearchContainer searchQuery={searchQuery} />}
            >
              <Route>
                <Route index element={<Beers searchQuery={searchQuery} />} />
                <Route
                  index
                  path="beers"
                  element={<Beers searchQuery={searchQuery} />}
                />
                <Route
                  path="bars"
                  element={<Bars searchQuery={searchQuery} />}
                />
                <Route
                  path="users"
                  element={<Users searchQuery={searchQuery} />}
                />
                <Route
                  path="events"
                  element={<Events searchQuery={searchQuery} />}
                />
              </Route>
            </Route>
          </Routes>
          <NavBar value={currentView} onChange={handleNavBarChange} />
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
