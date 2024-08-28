import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SearchAppBar from "./layouts/SearchBar";
import NavBar from "./layouts/NavBar";
import Home from "./pages/Home/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Beers from "./pages/Beers/Beers";
import "./App.css"; // Importa el archivo de estilos globales

function App() {
  const [currentView, setCurrentView] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Nuevo estado de búsqueda

  const handleNavBarChange = (event, newValue) => {
    setCurrentView(newValue);
  };

  const handleSearchClick = () => {
    setCurrentView(3);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Actualizar búsqueda global
  };

  const renderContent = () => {
    switch (currentView) {
      case 0:
        return <Home />;
      case 3:
        return <Beers searchQuery={searchQuery} />;  // Pasar búsqueda a Beers
      case 1:
        return <Map />;
      case 2:
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="container">
        <SearchAppBar
          onSearchClick={handleSearchClick}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {renderContent()}
        <NavBar value={currentView} onChange={handleNavBarChange} />
      </div>
    </>
  );
}

export default App;
