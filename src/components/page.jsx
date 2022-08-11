import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import Fuse from "fuse.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DebounceInput } from "react-debounce-input";
import cities from "../data/cities";
import CityLink from "./cards/cityLink";

export default function Page() {
  //const [cities, setCities] = useState({});
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fuse = new Fuse(Object.keys(cities), {
    includeScore: true,
    includeMatches: true,
  });

  useEffect(() => {
    const results = fuse.search(searchBoxValue).slice(0, 10);
    console.log("run search");

    const sorted = results.sort((a, b) => {
      const aMultiplier = a.item.toLowerCase().startsWith(searchBoxValue)
        ? 1
        : 0.1;
      const bMultiplier = b.item.toLowerCase().startsWith(searchBoxValue)
        ? 1
        : 0.1;

      return (
        cities[b.item] * (1 - b.score) * bMultiplier -
        cities[a.item] * (1 - a.score) * aMultiplier
      );
    });

    setSearchResults(sorted);
  }, [searchBoxValue]);

  return (
    <main>
      <section className={"citiesSection"}>
        <h2>Favorites:</h2>
        <div></div>
      </section>
      <section className={"citiesSection"}>
        <h2>Popular:</h2>
        <div></div>
      </section>
      <section className={"citiesSection"}>
        <h2>Search:</h2>
        <DebounceInput
          className={"searchBar"}
          placeholder={"Search for a city..."}
          value={searchBoxValue}
          minLength={4}
          debounceTimeout={300}
          onChange={(e) => setSearchBoxValue(e.target.value)}
        />
        <div>
          {searchResults.map((result) => {
            return <CityLink city={result} />;
          })}
        </div>
      </section>
    </main>
  );
}

/*
export default function Page() {
  return (
    <main>
      <h1>Not Sh*t Weather</h1>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </main>
  );
}
*/
