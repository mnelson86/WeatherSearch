//dependencies
import React, {FC, useState} from 'react';
import './App.css';
import {LocationSearch} from "./LocationSearch";
import {LocationTable} from "./LocationTable";
import {WeatherLocation} from "../model/Weather";
import {searchLocation} from "../services/WeatherService";
import {ErrorAlert, WarningAlert} from "./Alerts";
import {WeatherSummary} from "./WeatherSummary";

//set state and defaults
const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

//fill errors and warnings if unsuccessful call
  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  //return structure of separate components 
  return (
    <body id= "all">
    <div className="container">
      <h1>Weather Search</h1>

      <LocationSearch onSearch={addLocation}/>
      <h6>Default Search Hartford CT: Just press Search</h6>
      <ErrorAlert message={error}/>
      <WarningAlert message={warning}/>
      <LocationTable locations={locations}
                     current={currentLocation}
                     onSelect={location => setCurrentLocation(location)}/>

      <WeatherSummary location={currentLocation}/>
    </div>
    </body>
  );
};

export default App;