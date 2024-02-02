import '../src/App.css';

import React, { useEffect, useState } from 'react';


const App = () => {


const api_key = '2d38d29a163f3320aa7608d25b454138';
const [ciudad, setCiudad] = useState('Puebla');
const [lat, setLat] = useState(0);
const [lon, setLon] = useState(0);
const [temperature, setTemperature] = useState(0);
const [cityInput, setCityInput] = useState('');
const [currentCity, setCurrentCity] = useState('');






  const getGeocodingData = async(ciudad, pais, limite) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=${limite}&limit=&appid=${ api_key }`;

    try {
      const response = await fetch(url);
      //console.log(response);
      const data = await response.json();
      console.log(data);

      setCiudad(data[0].name );
      setLat(data[0].lat);
      setLon(data[0].lon);

      setCurrentCity(data[0].name);

      setCityInput('');
      
      getWeatherData(data[0].lat, data[0].lon);
    } 
    
    catch (error) {
      console.log(error);
    }
  }

  const getWeatherData = async (latitud, longitud) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const temperature = data.main.temp;
      setTemperature(temperature);
    } 
    
    catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  getGeocodingData('Puebla','MX', 2);
  
  getWeatherData(lat, lon);
}, [])


  return (
    <div>
      <div className='container'>
        
          <i className='bx bxs-map'></i>
          
          <input type ="text" placeholder='Ingresa el nombre de la ciudad de Mexico'
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}></input>
          
          <button onClick={() => getGeocodingData(cityInput, 'MX', 2)}>
          Obtener información de la ciudad
          </button>
          <h3>Localizacion: {currentCity} </h3>
       
          
        

        <div className="weather-box">
          <div className="box">
            <div className="info-weather">
              <div className="weather">
                <img src="images/cloud.png" alt="Ícono del clima"></img>
                <p className="temperature">{temperature} <span>K°</span></p>
                <p className="description">Temperatura actual</p>
              </div>
            </div>
          </div>
        </div>

        <div className="weather-details">
          <div className="humidity">
            <i className="fa-solid fa-water"></i>
            <div className="text">
              <div className="info-humidity">
                <span>Latitud</span>
              </div>
              <p>{lat}</p>
            </div>
          </div>

          <div className="wind">
            <i className="fa-solid fa-wind"></i>
            <div className="text">
              <div className="info-wind">
                <span>Longitud</span>
              </div>
              <p>{lon}</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};


export default App