{
  /*  archivo Summary.js dentro de carpeta Summary dentro de carpeta components
   */
}
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../Summary/Summary.css";

export default function Summary({ city }) {
  const KEY = "8200f5153a1ec94c419b46c12f847e8f";

  const [day2Name, setDay2Name] = useState("");
  const [day2Number, setDay2Number] = useState("");
  const [day3Name, setDay3Name] = useState("");
  const [day3Number, setDay3Number] = useState("");
  const [day4Name, setDay4Name] = useState("");
  const [day4Number, setDay4Number] = useState("");
  const [day5Name, setDay5Name] = useState("");
  const [day5Number, setDay5Number] = useState("");
  const [day1TempMin, setDay1TempMin] = useState("");
  const [day1TempMax, setDay1TempMax] = useState("");
  const [day2TempMin, setDay2TempMin] = useState("");
  const [day2TempMax, setDay2TempMax] = useState("");
  const [day3TempMin, setDay3TempMin] = useState("");
  const [day3TempMax, setDay3TempMax] = useState("");
  const [day4TempMin, setDay4TempMin] = useState("");
  const [day4TempMax, setDay4TempMax] = useState("");
  const [day5TempMin, setDay5TempMin] = useState("");
  const [day5TempMax, setDay5TempMax] = useState("");
  const [day1Month, setDay1Month] = useState("");
  const [day2Month, setDay2Month] = useState("");
  const [day3Month, setDay3Month] = useState("");
  const [day4Month, setDay4Month] = useState("");
  const [day5Month, setDay5Month] = useState("");
  const [day1Icon, setDay1Icon] = useState("");
  const [day2Icon, setDay2Icon] = useState("");
  const [day3Icon, setDay3Icon] = useState("");
  const [day4Icon, setDay4Icon] = useState("");
  const [day5Icon, setDay5Icon] = useState("");

  useEffect(() => {
    const promesa = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=metric`
    );
    Promise.all([promesa]).then(async (values) => {
      const data = await values[0].json();
      console.log(data?.list);

      // Obtener las fechas para los próximos 5 días
      const today = new Date();
      const dates = [];
      for (let i = 1; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }

      // Obtener los nombres de los meses para cada fecha
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
      const monthNames = [];
      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        monthNames.push(months[date.getUTCMonth()]);
      }

      setDay1Month(monthNames[0]);
      setDay2Month(monthNames[1]);
      setDay3Month(monthNames[2]);
      setDay4Month(monthNames[3]);
      setDay5Month(monthNames[4]);

      // Obtener las temperaturas mínimas y máximas para cada día
      for (let j = 0; j < dates.length; j++) {
        let dayTempMin = Infinity;
        let dayTempMax = -Infinity;
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.startsWith(dates[j])) {
            dayTempMin = Math.round(
              Math.min(dayTempMin, data.list[i].main.temp_min)
            );
            dayTempMax = Math.round(
              Math.max(dayTempMax, data.list[i].main.temp_max)
            );
          }
        }
        if (j === 0) {
          setDay1TempMin(dayTempMin);
          setDay1TempMax(dayTempMax);
        } else if (j === 1) {
          setDay2TempMin(dayTempMin);
          setDay2TempMax(dayTempMax);
        } else if (j === 2) {
          setDay3TempMin(dayTempMin);
          setDay3TempMax(dayTempMax);
        } else if (j === 3) {
          setDay4TempMin(dayTempMin);
          setDay4TempMax(dayTempMax);
        } else if (j === 4) {
          setDay5TempMin(dayTempMin);
          setDay5TempMax(dayTempMax);
        }
      }

      // Obtener el código del icono del clima para cada día
      for (let j = 0; j < dates.length; j++) {
        let icon;
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.startsWith(dates[j])) {
            icon = data.list[i].weather[0].icon;
            break;
          }
        }
        if (j === 0) {
          setDay1Icon(icon);
        } else if (j === 1) {
          setDay2Icon(icon);
        } else if (j === 2) {
          setDay3Icon(icon);
        } else if (j === 3) {
          setDay4Icon(icon);
        } else if (j === 4) {
          setDay5Icon(icon);
        }
      }

      // Obtener los nombres de los días de la semana y los números para cada fecha
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayNames = [];
      const dayNumbers = [];
      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        dayNames.push(daysOfWeek[date.getUTCDay()]);
        dayNumbers.push(date.getUTCDate());
      }

      setDay2Name(dayNames[1]);
      setDay2Number(dayNumbers[1]);
      setDay3Name(dayNames[2]);
      setDay3Number(dayNumbers[2]);
      setDay4Name(dayNames[3]);
      setDay4Number(dayNumbers[3]);
      setDay5Name(dayNames[4]);
      setDay5Number(dayNumbers[4]);
    });
  }, [city]);

  // Función para obtener la URL de la imagen según el código del icono del clima
  const getWeatherIconUrl = (setTmrIcon) => {
    return `/img/${setTmrIcon}.png`;
  };

  return (
    <div className="d-flex flex-row p-3 gap-4 h-100">
      <div className="d-flex caja p-3 flex-column align-items-center h-60">
        <p className="text-light">Tomorrow</p>
        <Image
          src={getWeatherIconUrl(day1Icon)}
          alt="icono-clima"
          height={62}
          width={57}
          className="d-flex"
        />
        <div className="d-flex gap-2">
          <p className="d-flex text-light">{day1TempMax}°C</p>
          <p className="d-flex text-secondary">{day1TempMin}°C</p>
        </div>
      </div>
      <div className="d-flex caja p-3 flex-column align-items-center h-60">
        <p className="text-light">
          {day2Name}, {day2Number} {day2Month}
        </p>
        <Image
          src={getWeatherIconUrl(day2Icon)}
          alt="icono-clima"
          height={62}
          width={57}
          className="d-flex"
        />
        <div className="d-flex gap-2">
          <p className="d-flex text-light">{day2TempMax}°C</p>
          <p className="d-flex text-secondary">{day2TempMin}°C</p>
        </div>
      </div>
      <div className="d-flex caja p-3 flex-column align-items-center h-60">
        <p className="text-light">
          {day3Name}, {day3Number} {day3Month}
        </p>
        <Image
          src={getWeatherIconUrl(day3Icon)}
          alt="icono-clima"
          height={62}
          width={57}
          className="d-flex"
        />
        <div className="d-flex gap-2">
          <p className="d-flex text-light">{day3TempMax}°C</p>
          <p className="d-flex text-secondary">{day3TempMin}°C</p>
        </div>
      </div>
      <div className="d-flex caja p-3 flex-column align-items-center h-60">
        <p className="text-light">
          {day4Name}, {day4Number} {day4Month}
        </p>
        <Image
          src={getWeatherIconUrl(day4Icon)}
          alt="icono-clima"
          height={62}
          width={57}
          className="d-flex"
        />
        <div className="d-flex gap-2">
          <p className="d-flex text-light">{day4TempMax}°C</p>
          <p className="d-flex text-secondary">{day4TempMin}°C</p>
        </div>
      </div>
      <div className="d-flex caja p-3 flex-column align-items-center h-60">
        <p className="text-light">
          {day5Name}, {day5Number} {day5Month}
        </p>
        <Image
          src={getWeatherIconUrl(day5Icon)}
          alt="icono-clima"
          height={62}
          width={57}
          className="d-flex"
        />
        <div className="d-flex gap-2">
          <p className="d-flex text-light">{day5TempMax}°C</p>
          <p className="d-flex text-secondary">{day5TempMin}°C</p>
        </div>
      </div>
    </div>
  );
}
