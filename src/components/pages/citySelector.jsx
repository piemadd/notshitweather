import cities from "../../data/cities";
import { useState } from "react";

export default function CitySelector() {
  const [selectedState, setSelectedState] = useState("");

  let states = [];
  Object.keys(cities).forEach((cityName) => {
    const nameArray = cityName.split(", ");
    const name = nameArray[nameArray.length - 1];
    if (!states.includes(name)) {
      states.push(name);
    }
  });
  console.log(states.sort());

  return (
    <>
      <label htmlFor="states">Choose a Region:</label>

      <select
        name="states"
        id="states"
        onChange={(e) => {
          setSelectedState(e.target.value);
          console.log("selectedState", e.target.value);
        }}
      >
        <option value="">---</option>
        {states.sort().map((state) => {
          return (
            <option key={state} value={state}>
              {state}
            </option>
          );
        })}
      </select>
      {Object.values(cities).map((city) => {
        if (!city.name.includes(selectedState)) {
          return null;
        }

        return (
          <p
            style={{
              fontSize: "1.2rem",
            }}
          >
            <a>{city.name}</a>
          </p>
        );
      })}
    </>
  );
}
