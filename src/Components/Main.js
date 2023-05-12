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
      <h2 className="Main-city" style={{marginLeft:`${(data.name.length>14)?"-7vw":"0"}`}}>{data.name},{data.sys.country}</h2>:null}
       
        {data.weather?
        <p className="Main-weather"> {data.weather[0].main} </p>: null}
        {data.weather && (data.weather[0].main==="Clouds" || data.weather[0].main==="Haze" || data.weather[0].main==="Mist")?
  <img src={Clouds} alt="Clouds" style={{marginLeft:`${(data.name.length < 6) ? ((20>data.name.length > 14) ? "4.6vw" : "2vw") : ((data.name.length > 20) ? "8vw" : "31%")}`,
  marginTop: `${(data.name.length > 20) ? "-1vw" : ""}`}}/>:null}

{data.weather && (data.weather[0].main==="Clear"||data.weather[0].main==="Sand")?
  <img src={Sun} alt="Clear" style={{marginLeft:`${(data.name.length < 7) ? ((20>data.name.length > 14) ? "4.5vw" : "2.1vw") : ((data.name.length > 20) ? "7.9vw" : "32%")}`,marginTop:"-6%",}}/>:null}

{data.weather &&( data.weather[0].main==="Rain" || data.weather[0].main==="Thunderstorm")?
  <img src={Rain} alt="Rain" style={{marginLeft:`${(data.name.length < 7) ? ((20>data.name.length > 14) ? "4.6vw" : "1.5vw") : ((data.name.length > 20) ? "8vw" : "30%")}`}}/>:null}


        {data.main?
        <h2 className="degrees-top" style={{marginTop: `${(data.name.length > 20) ? "1.5vw" : ""}`}} >{((data.main.temp-32)/1.8).toFixed()}°C</h2>:null}
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
