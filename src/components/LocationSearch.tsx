//dependency
import React, {FC, useState} from "react";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

//default search and disable search values
export const LocationSearch: FC<LocationSearchProps> = ({onSearch}) => {
  const [locationSearch, setLocationSearch] = useState('Hartford');
  const disableSearch = locationSearch.trim() === '';

  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  
  //return search bar and button
  return (
    <div>
      <label>
        Add Location
        <input className="ml-1 mr-1" type="text" value={locationSearch} placeholder ="Enter city's name/zip"
               onChange={e => setLocationSearch(e.target.value)}/>
      </label>
      <button className="btn btn-primary"
              onClick={addLocation} disabled={disableSearch}>Search
      </button>
    </div>
  );
}