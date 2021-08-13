//dependencies
import React, {FC, useEffect, useState} from "react";
import {WeatherEntry} from "./WeatherEntry";
import {Weather, WeatherLocation} from "../model/Weather";
import {readForecast, readWeather} from "../services/WeatherService";
import './WeatherSummary.css';

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

//default props
export const WeatherSummary: FC<WeatherSummaryProps> = ({location}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  //2 async calls for current and forecast
  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id)
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })()
  }, [location]);

  //null check does not display if there is no data to display
  if (!location || !weather || !forecast) return null;

  return (
    <div id= "resultsTable">
      <hr/>
      <h2>Current: {location.name}</h2>
      <WeatherEntry weather={weather}/>

      <h2>Forecast</h2>
      <div>
        <ol style={({whiteSpace: 'nowrap'})}>
          {forecast.map(timePoint =>
            <li key={timePoint.dt}>
              <WeatherEntry weather={timePoint}/>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};