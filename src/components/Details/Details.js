import React, { useEffect, useState } from "react";
import "../Details/Details.css";
import Summary from "../Summary/Summary";

export default function Details({ city }) {
  const KEY = "8200f5153a1ec94c419b46c12f847e8f";
  const [windSpeed, setWindSpeed] = useState();
  const [humidity, setHumidity] = useState();
  const [visibility, setVisibility] = useState();
  const [airPressure, setAirPressure] = useState();

  useEffect(() => {
    const promesa = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`
    );
    Promise.all([promesa]).then(async (values) => {
      const data = await values[0].json();
      setWindSpeed(data?.wind?.speed);
      setHumidity(data?.main?.humidity);
      setVisibility(data?.visibility);
      setAirPressure(data?.main?.pressure);
    });
  }, [city]);

  return (
    <div className="d-flex details-container gap-5 h-100 w-100 p-4">
      <div className="d-flex h-100 flex-wrap w-100 justify-content-center cajas">
        <div className="box">
          <p className="title">Wind status:</p>
          <p className="data">
            <p className="number">{windSpeed}</p> m/s
          </p>
        </div>
        <div className="box">
          <strong>Humidity</strong> {humidity}%
          <progress value={humidity} max="100"></progress>
        </div>
        <div className="box-small">
          <strong>Visibility:</strong> {visibility} meters
        </div>
        <div className="box-small">
          <strong>Air Pressure:</strong> {airPressure} hPa
        </div>
      </div>
    </div>
  );
}
