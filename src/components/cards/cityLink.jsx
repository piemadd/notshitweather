//takes a fuse search result and returns a city card

import { useEffect, useState } from "react";

export default function CityLink({ city, coords }) {
  const text = city.matches[0].value;
  let highlightSections = [];

  for (let i = 0; i < city.matches[0].indices.length; i++) {
    highlightSections.push(city.matches[0].indices[i][0]);
    highlightSections.push(city.matches[0].indices[i][1]);
  }

  if (highlightSections[0] !== 0) {
    highlightSections.unshift(0);
    highlightSections.unshift(0);
  }

  if (highlightSections[highlightSections.length - 1] !== text.length) {
    highlightSections.push(highlightSections[highlightSections.length - 1]);
    highlightSections.push(text.length);
  }

  console.log(highlightSections);
  console.log(
    city.matches[0].value.substring(highlightSections[0], highlightSections[1])
  );

  useEffect(() => {
    function setCurrent() {
      fetch(`https://api.weather.gov/points/${coords.join(",")}`)
        .then((res) => res.json())
        .then((data) => {
          window.sessionStorage.setItem("current", {
            name: text,
            coords: coords,
            gridId: data.properties.gridId,
            gridX: data.properties.gridX,
            gridY: data.properties.gridY,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <p>
      {highlightSections.map((section, index) => {
        if (index % 2 === 0) {
          return (
            <span key={index} className={"highlight"}>
              {text.substring(section, highlightSections[index + 1])}
            </span>
          );
        } else {
          return (
            <span key={index}>
              {text.substring(section, highlightSections[index + 1])}
            </span>
          );
        }
      })}
    </p>
  );
}
