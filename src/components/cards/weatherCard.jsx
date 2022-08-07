export default function WeatherCard({ forecastType, cardData, tz }) {
    const windDirectionDict = {
      N: "north",
      NNE: "north_east",
      NE: "north_east",
      ENE: "north_east",
      E: "east",
      ESE: "south_east",
      SE: "south_east",
      SSE: "south_east",
      S: "south",
      SSW: "south_west",
      SW: "south_west",
      WSW: "south_west",
      W: "west",
      WNW: "north_west",
      NW: "north_west",
      NNW: "north_west",
    };
  
    if (cardData) {
      const startTime =
        forecastType === "daily"
          ? cardData.name
          : new Date(cardData.startTime).toLocaleTimeString("en-US", {
              timeZone: tz,
              hour: "numeric",
              minute: "2-digit",
            });
  
      return (
        <div className={"innerCard foreCast"}>
          <span>
            <p>{startTime}</p>
            <p> | </p>
            <span className={"material-symbols-rounded icon"}>
              {windDirectionDict[cardData.windDirection]}
            </span>
            <p>{cardData.windSpeed}</p>
          </span>
          <span>
            <h3>
              {cardData.temperature}°{cardData.temperatureUnit}{" "}
              {cardData.shortForecast}
            </h3>
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
  