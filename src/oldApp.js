import "./App.css";

import React, { useState, useEffect } from "react";
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

  const [lastUpdated, setLastUpdated] = useState(
    new Date()
  );

  const [isLoading, setIsLoading] = useState(true);

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
    }, 29000);

    return () => clearInterval(interval);
  }, []);

  return !isLoading ? (
    <main>
      <section className="outerSection">
        <h1>Weather:</h1>
      </section>
      <section id="weather" className="outerSection">
        {Object.keys(appData.weather).map((forecastType) => {
          if (forecastType !== "meta") {
            return (
              <Forecast
                key={`${forecastType}-forecast`}
                forecastType={forecastType}
                forecastData={appData.weather[forecastType]}
                tz={appData.weather.meta.tz}
              />
            );
          } else {
            return null;
          }
        })}
      </section>
      <section className="outerSection">
        <p>
          Last Updated:{" "}
          {lastUpdated.toLocaleString("en-US", {
            timeZone: appData.weather.meta.tz,
          })}
        </p>
      </section>
    </main>
  ) : (
    <section>
      <h1>Loading...</h1>
    </section>
  );
}

export default App;
