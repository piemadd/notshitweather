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
      <div style={{
        fontSize: "1.4rem",
        margin: "6px 6px 12px 6px",
        display: 'flex',
        alignItems: 'center',
      }}>
        <label htmlFor="states">
          Choose a Region:
        </label>
        &nbsp;
        <select
          name="states"
          id="states"
          className="dropDown"
          onChange={(e) => {
            setSelectedState(e.target.value);
            console.log("selectedState", e.target.value);
          }}
        >
          <option value="all">All</option>
          {states.sort().map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
      </div>
      {Object.values(cities).map((city) => {
        let state = city.name.split(', ')[city.name.split(', ').length - 1];
        if (state !== selectedState && selectedState !== 'all') {
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
