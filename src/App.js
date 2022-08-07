import "./App.css";

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import useMediaQuery from "@mui/material/useMediaQuery";

import Page from "./components/page.jsx";

import Forecast from "./components/sections/forecast.jsx";

function App() {
  const [appData, setAppData] = useState({
    transit: {
      cta: {
        train: {},
        bus: {},
      },
      metra: {
        train: {},
      },
    },
    weather: {
      hourly: {},
      daily: {},
      meta: {},
    },
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width:740px)");
  const [value, setValue] = React.useState(0);

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
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1800000); //30 minutes

    return () => clearInterval(interval);
  }, []);

  return !isLoading ? (
    isDesktop ? (
      <>
        <Page />
      </>
    ) : (
      <Box>
        <Paper sx={{
          pb: 7
        }}>
          <Page />
        </Paper>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<LocationOn />} />
            <BottomNavigationAction label="Favorites" icon={<LocationOn />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
          </BottomNavigation>
        </Paper>
      </Box>
    )
  ) : (
    <section>
      <h1>Loading...</h1>
    </section>
  );
}

export default App;
