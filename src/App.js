import "./App.css";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LocationOn } from "@mui/icons-material";
import Forecast from "./components/sections/forecast.jsx";
import Page from "./components/pages/page";
import CitySelector from "./components/pages/citySelector";

function App() {
  const [appData, setAppData] = useState({});
  const [currentPath, setCurrentPath] = useState("/");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width:740px)");
  const [page, setPage] = React.useState(0);

  const fetchData = async () => {
    console.log("fetching data...");
    const res = await fetch("https://aptinfo.piemadd.repl.co/api");
    const data = await res.json();
    setAppData(data);
    setLastUpdated(new Date());
    setIsLoading(false);
    console.log("data fetched");
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    console.log("current path: " + currentPath);

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1800000); //30 minutes

    return () => clearInterval(interval);
  }, []);

  let content = null;
  switch (currentPath) {
    case "/":
      content = <Page data={appData} />;
      break;
    case "/cities":
      content = <CitySelector />;
      break;
    case "/settings":
      content = <div>settings</div>;
      break;
    default:
      content = <div>404</div>;
  }

  return !isLoading ? (
    <Box>
      <Paper
        sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Paper>
      <Paper
        sx={{
          pt: 7,
          bgcolor: "#111",
        }}
        elevation={0}
      >
        {content}
      </Paper>
    </Box>
  ) : (
    <section>
      <h1>Loading...</h1>
    </section>
  );
}

export default App;
