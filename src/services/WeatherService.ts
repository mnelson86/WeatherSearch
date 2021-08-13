//dependency
import {Weather, WeatherLocation} from '../model/Weather';


// key to be removed before GitHub
const keyQuery = `appid=c06e26fb78379375d02dba5f18c0f524`
const server = 'https://api.openweathermap.org/data/2.5';

//api calls and error messages in case of failure

//fetch location 
export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;
  if (result.status !== 200) throw new Error('Failed to read location data');

  return await result.json();
}

//fetch weather
export async function readWeather(locationId: number): Promise<Weather> {
  const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`);

  if (current.status !== 200) throw new Error('Failed to read location data');

  return await current.json();
}

//fetch 8-day forecast
export async function readForecast(locationId: number): Promise<Weather[]> {
  const forecast = await fetch(`${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`);

  if (forecast.status !== 200) throw new Error('Failed to read location data');

  return (await forecast.json()).list;
}

//fetch icons
export function getIconUrl(code: string): string {
  return `https://openweathermap.org/img/wn/${code}.png`;
}