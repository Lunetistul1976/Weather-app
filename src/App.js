import React,{useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import Main from './Components/Main'
import axios from'axios'



function App() {
  const [data, setData] = useState({});
  const [location,setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="App_main">
    <Navbar searchLocation={searchLocation}
            setLocation={setLocation}
            location={location}    
    />
    <Main data={data}/>
    </div>
  );
}

export default App;
