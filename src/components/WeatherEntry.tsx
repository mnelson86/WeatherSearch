//dependencies
import React, {FC} from "react";
import {Weather} from "../model/Weather";
import {getIconUrl} from "../services/WeatherService";

interface WeatherEntryProps {
	weather: Weather;
}

//time conversion
function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherEntry: FC<WeatherEntryProps> = ({weather}) =>
  <div>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>
    <div>
      {/* display temps converted to farenheit */}
      <strong>{Math.round((weather.main.temp * 1.8) + 32)}°F</strong>
      <div>({Math.round((weather.main.temp_min * 1.8) + 32)}°F / 
            {Math.round((weather.main.temp_max * 1.8) + 32)}°F)</div>
    </div>
    <div>Humidity: {weather.main.humidity}%</div>
    {/*display icon from open weather api*/}
    {weather.weather.map(condition =>
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main}/> {condition.main} {condition.description}
      </div>)
    }
  </div>;