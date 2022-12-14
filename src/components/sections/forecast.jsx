import WeatherCard from "../cards/weatherCard.jsx";

export default function Forecast({ forecastType, forecastData, tz, limit = 6 }) {
  const forecastTypeName = forecastType === "hourly" ? "Hourly" : "Daily";

  const currentHour = new Date().getHours();

  if (forecastData.periods && forecastData.periods.length > 0) {

    if (forecastType === "hourly") {
      while (
        new Date(forecastData.periods[0].startTime).getHours() !== currentHour
      ) {
        forecastData.periods.shift();
      }
    }

    return (
      <section key={`${forecastTypeName}`} className={"outerCard"}>
        <h2>{forecastTypeName}</h2>
        {forecastData.periods.map((forecastDataPoint, i) => {
          if (i < limit) {
            return (
              <WeatherCard
                forecastType={forecastType}
                cardData={forecastDataPoint}
                tz={tz}
              />
            );
          } else {
            return null;
          }
        })}
      </section>
    );
  } else {
    return null;
  }
}
