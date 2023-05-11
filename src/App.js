import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import Forecast from './Components/Forecast';
import axios from 'axios';




const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd49948f7f9msh31004b1b44f6034p1b3e47jsn6c2a0f663014',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;
      const forecastResponse = await axios.get(forecastUrl);
      setForecast(forecastResponse.data);
    };

    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon]);

  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;
  const geoLocationApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;

  const searchLocation = async (event) => {
    if (event.key === "Enter"|| event) {
      axios.get(weatherApiUrl).then((response) => {
        setData(response.data);
      });
  
      axios.get(geoLocationApiUrl).then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLat(lat);
          setLon(lon);
        }
      });
  
      setLocation("");
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const geoApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=600000&namePrefix=${value}&limit=4&sort=-population&hateoasMode=false&fields=name`;
    const response = await axios.get(geoApiUrl, geoApiOptions);
    setSuggestions(response.data.data);
  };

  const onSuggestionsClearRequested = () => {
    
      setSuggestions([]);
  
    
  };
  

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div onClick={() => onSuggestionSelected({ suggestion })}>
      {suggestion.name},{suggestion.countryCode}
    </div>
  );
  
  const onSuggestionSelected = async ({ suggestion }) => {
    if (suggestion) {
      const { name, latitude, longitude } = suggestion;
      setLocation(name);
  
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;
      const weatherResponse = await axios.get(weatherApiUrl);
      setData(weatherResponse.data);
  
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;
      const forecastResponse = await axios.get(forecastUrl);
      setForecast(forecastResponse.data);
      setSuggestions([])
    }
  };

  return (
    <div className="App_main">
      <Navbar
        setLocation={setLocation}
        searchLocation={searchLocation}
        location={location}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
        />
      <Main data={data} />
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
export default App;
