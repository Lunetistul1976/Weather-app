import React from "react";
import BG from '../Images/Main BG.webp'
import '../CSS/Main.css'
import Clouds from '../Images/Clouds.webp'
import Sun from '../Images/Sun.png'
import Rain from '../Images/rain.webp'

const Main=({data}) =>{
  return(
    <div className="Main-bg">
      <img src={BG} alt="Weather-app background" />
      <div className="top">
        {data.name?
        <h2 className="Main-city">{data.name},{data.sys.country}</h2>:null}
       
        {data.weather?
        <p className="Main-weather"> {data.weather[0].main} </p>: null}
        {data.weather && (data.weather[0].main==="Clouds" || data.weather[0].main==="Haze" || data.weather[0].main==="Mist")?
          <img src={Clouds} alt="Clouds"/>:null}
        
         {data.weather && data.weather[0].main==="Clear"?
          <img src={Sun} alt="Clear"/>:null}
         
          {data.weather &&( data.weather[0].main==="Rain" || data.weather[0].main==="Thunderstorm")?
          <img src={Rain} alt="Rain"/>:null}

        {data.main?
        <h2 className="degrees-top" >{((data.main.temp-32)/1.8).toFixed()}°C</h2>:null}
      </div>
      {data.name !== undefined &&
      <div className="Main-details">
        <h2 className="Details">Details</h2> 
        <div>
          <p className="feels">Feels like:</p>
          {data.main?
          <p className="degrees"style={{marginLeft:"10%"}}>{((data.main.feels_like-32)/1.8).toFixed()}°C</p>:null}
        </div>
        <div>
          <p className="wind">Wind:</p>
          {data.wind?
          <p className="wind-speed" style={{marginLeft:"27%"}}>{data.wind.speed}m/s</p>:null}
        </div>
        <div>
          <p className="Humidity">Humidity:</p>
          {data.main?
          <p className="humidity-measured"style={{marginLeft:"10%"}}>{data.main.humidity}%</p> :null}
        </div>
        <div>
          <p className="Pressure">Pressure:</p>
          {data.main?
          <p className="Pressure-meassured" style={{marginLeft:"6%"}}>{data.main.pressure}hPa</p> :null}
        </div>
      </div>}

    </div>
  )
}
export default Main;
