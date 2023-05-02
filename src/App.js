import React,{useState,useEffect} from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import Main from './Components/Main'
import Forecast from './Components/Forecast'
import axios from'axios'





function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [suggestedCities,setSuggestedCities]=useState('');

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

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;
  const GeoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=ea2bd25a434ab2ebbe74bcc8934a6616`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
  
      axios.get(url).then((response) => {
        setData(response.data);
      });
  
      axios.get(GeoLocationUrl).then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLat(lat);
          setLon(lon);
        }
      });
  
      setLocation("");
    }
  };
  

  return (
    <div className="App_main" >
      <Navbar
        searchLocation={searchLocation}
        setLocation={setLocation}
        location={location}
        suggestedCities={suggestedCities}
        setSuggestedCities={setSuggestedCities}
      />
      <Main data={data} />
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
export default App;

