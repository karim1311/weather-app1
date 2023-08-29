"use client";
{
  /* archivo Card.js dentro de carpeta components dentro de carpeta app, dentro de carpeta src*/
}
import React from "react";
import Image from "next/image";
import "./Card.css";
import Search from "../Search/Search";

export default function Card({ temperature, cityName, weatherIcon, onCityChange }) {
  // Función para obtener la URL de la imagen según el código del icono del clima
  const getWeatherIconUrl = (iconCode) => {
    return `/img/${iconCode}.png`;
  };

  // Función para obtener la fecha actual
  const getCurrentDate = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    return `${dayOfWeek}, ${day} ${month}`;
  };
  console.log(weatherIcon);

  return (
    <div>
      <div className="main">
        <Search onCityChange={onCityChange} />
        <div className="imagen">
          {weatherIcon && (
            <Image
              src={getWeatherIconUrl(weatherIcon)}
              alt="imagen"
              width={"150"}
              height={"150"}
            />
          )}
        </div>
        <div className="temp">{temperature && <div>{temperature}°C</div>}</div>
        <div className="fecha">{getCurrentDate()}</div>
        <div className="place p-3">{cityName && <div>{cityName}</div>}</div>
      </div>
    </div>
  );
}
