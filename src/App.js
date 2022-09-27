import React, { useState, useEffect } from "react";
import { fetchWeather } from "./Api";
import "./Style";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    "main" in weather ? setError(null) : setError(weather.message);
  }, [weather]);

  const search = async (e) => {
    if (e.key === "Enter") {
      setLoader(true);
      setWeather(await fetchWeather(query));
      setQuery("");
      setLoader(false);
    }
  };

  return (
    <div className="main-container">
      <img src="./weather.png" alt="weather-icon" />
      <h3 className="text-searching">Weather App</h3>

      <input
        type="text"
        className="search"
        placeholder="Search City ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {isLoading && (
        <div>
          <p className="text-searching"> Searching... </p>
          <img src="./spinner.gif" alt="spinner" width={100} />
        </div>
      )}
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)} <sup>&deg;C</sup>{" "}
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p> {weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="city">
          <h2 className="city-name">{error}</h2>
        </div>
      )}
    </div>
  );
}
