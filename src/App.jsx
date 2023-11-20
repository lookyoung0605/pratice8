import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [cityname, setCityname] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (event) => {
    setCityname(event.target.value);
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=cc73b34865364117835f79a2b3e5abed`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
          setWeatherData(data);
          console.log(weatherData);
        }
        if (data.cod === "404") {
          setWeatherData(null);
          console.log(weatherData);
        }
      } catch (error) {
        setWeatherData(null);
        console.log(weatherData);
      }
    }
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <input
        placeholder="도시를 입력하세요."
        value={cityname}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        style={{
          width: "15em",
          height: "3em",
          border: "3px solid",
          borderRadius: "8px",
          fontSize: "1em",
          marginBottom: "1em",
          boxSizing: "border-box",
        }}
      />
      {weatherData ? (
        <div
          style={{
            width: "15em",
            height: "15em",
            border: "3px solid",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
            boxSizing: "border-box",
            marginTop: "3em",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              fontSize: "2em",
            }}
          >
            {weatherData.name}
          </div>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              fontSize: "4em",
            }}
          >
            {Math.round((weatherData.main.temp - 273.15) * 10) / 10}°C
          </div>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              fontSize: "1.5em",
            }}
          >
            {weatherData.weather[0].main}
          </div>
        </div>
      ) : null}
    </div>
  );
}
