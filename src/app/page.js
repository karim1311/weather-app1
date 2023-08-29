"use client";
{
  /* archivo page.js dentro de carpeta app, dentro de carpeta src */
}
import React from "react";
import Card from "../components/Card/Card";
import Details from "../components/Details/Details";
import Summary from "@/components/Summary/Summary";
import { useEffect, useState } from "react";
import "../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

export default function Home() {
  const KEY = "8200f5153a1ec94c419b46c12f847e8f";
  const [temperature, setTemperature] = useState();
  const [cityName, setCityName] = useState();
  const [weatherIcon, setWeatherIcon] = useState();


  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleCityChange = (newCity) => {
    // Actualizamos el estado de la ciudad aquí
    setCityName(newCity);
    // Luego, podrías realizar la llamada a la API con la nueva ciudad
    fetchWeatherData(newCity);
  };


  const handleSearchClick = () => {
    setShowSearch(true);
  };


  const fetchWeatherData = (city) => {
    const promesa = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`
    );
    Promise.all([promesa]).then(async (values) => {
      const data = await values[0].json();
      setTemperature(Math.round(data?.main?.temp));
      setCityName(data?.name);
      setWeatherIcon(data?.weather?.[0]?.icon);
    });
  };

  useEffect(() => {
    fetchWeatherData("Pueblo Nuevo"); // Load default data when the page loads
  }, []);

  return (
    <div className="main-container">
      <Card
        temperature={temperature}
        cityName={cityName}
        weatherIcon={weatherIcon}
        onCityChange={handleCityChange}
      />
      <div className="details">
      <Summary city={cityName} />
      <p className="text-light">Todays highlights</p>
      <Details city={cityName} />
      </div>
    </div>
  );
}
