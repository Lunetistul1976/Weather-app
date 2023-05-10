import React from "react";
import "../CSS/Forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Clouds from '../Images/Clouds.webp'
import Sun from '../Images/Sun.png'
import Rain from '../Images/rain.webp'

const Forecast = ({ data}) => {
  if(data.list==null)return null

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const nextSevenDays = Array.from({length: 7}, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return date;
  });
  
 
  return (
    
    <div className="Day-bg" >
      <p className="Main-Daily">Daily</p>
      <div className="daily-item-container">
      
      <Accordion allowZeroExpanded >
      
        {data.list.slice(0,7).map((item, index) => (

          <AccordionItem key={index}>
            <AccordionItemHeading >
            
              <AccordionItemButton >
                
              <div className="daily-item" >

                {item.main && (item.weather[0].main==="Clouds" || item.weather[0].main==="Haze" || item.weather[0].main==="Mist")?
          <img src={Clouds} alt="Clouds"/>:null}
        
         {item.weather && item.weather[0].main==="Clear"?
          <img src={Sun} alt="Clear"/>:null}
         
          {item.weather &&( item.weather[0].main==="Rain" || item.weather[0].main==="Thunderstorm")?
          <img src={Rain} alt="Rain"/>:null}
      
                <p className={`day ${index === 6 ? "first-day" : ""}${index === 3 ? "fourth-day" : ""}${index === 2 ? "fifth-day" : ""}${index === 5 ? "second-day" : ""}${index === 1 ? "six-day" : ""}${index === 0 ? "seven-day" : ""}${index === 4 ? "third-day" : ""}`} 
                style={item.weather &&( item.weather[0].main==="Clear") ? {marginLeft: "-44.5vw"} : (item.weather[0].main==="Clouds"|| item.weather[0].main==="Haze" || item.weather[0].main==="Mist") ? {marginLeft: "-43.2vw"} : (item.weather[0].main==="Rain"|| item.weather[0].main==="Thunderstorm") ? {marginLeft: "-44vw"} : null}>
                  {daysOfWeek[nextSevenDays[index].getDay()]}</p>
                <p className="temperature" style={{ marginLeft: `${(item.main.temp_max < 10 || item.main.temp_min < 10) ? "1vw" : "0"}` }}> {Math.round((item.main.temp_max))} &deg;C/{Math.round((item.main.temp_min))} &deg;C</p>
                <p className="description" style={item.weather &&( item.weather[0].description==="broken clouds") ? {marginLeft: "-0.78vw"}:( item.weather[0].description==="scattered clouds")?{marginLeft: "-2.6vw"}:( item.weather[0].description==="few clouds")?{marginLeft: "1.3vw"}:( item.weather[0].description==="overcast clouds")?{marginLeft: "-2.6vw"}:( item.weather[0].description==="moderate rain")?{marginLeft: "-2.7vw"}:( item.weather[0].description==="light rain")?{marginLeft: "0.4vw"} :null}> {item.weather[0].description}</p>
                
                </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </div>
          );
};

export default Forecast;
