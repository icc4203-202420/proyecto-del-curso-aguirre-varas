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

import Beers from "./pages/Beers/Beers";
import Bars from "./pages/Bars/Bars";
import Users from "./pages/Users/Users";
import Events from "./pages/Events/Events";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
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
  /*
    const renderContent = () => {
      switch (currentView) {
        case 0:
          return <Home />;
        case 3:
          return <SearchContainer searchQuery={searchQuery}></SearchContainer>; // Pasar búsqueda a Beers
        case 1:
          return <Map />;
        case 2:
          return <Profile />;
        default:
          return <Home />;
      }
    };
  */
  return (
    <>
      <CssBaseline />
      <div className="container">
        <SearchAppBar
          onSearchClick={handleSearchClick}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <Routes>
          <Route index path="/" element={<Home />} />
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
              <Route path="bars" element={<Bars searchQuery={searchQuery} />} />
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
    </>
  );
}

export default App;
