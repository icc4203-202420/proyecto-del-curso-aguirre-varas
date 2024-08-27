import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";

/* Component imports */
import SearchAppBar from "./layouts/SearchBar";
import NavBar from "./layouts/NavBar";
import Beers from "./pages/Beers/Beers";

function App() {
  const [value, setValue] = useState(0);
  const onChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <CssBaseline />

      <Container maxWidth="sm">
        <SearchAppBar></SearchAppBar>
        <Beers></Beers>
        <NavBar value={value} onChange={onChange}></NavBar>
      </Container>
    </>
  );
}

export default App;
