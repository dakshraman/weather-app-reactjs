import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; // Import your custom CSS file for styling

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '25d5a4b6c029fdedea8f17568be493ca';

  const fetchWeatherData = () => {
    if (city === '') {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <div className="weather-app">
      <h1 className="chat-title">Check Your City's Weather</h1>
      <div className="chat-container">
        <div className="chat-bubble user">
          <label className="user-label">You: </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city name"
          />
          <button className="user-button" onClick={fetchWeatherData}>
            Get Weather
          </button>
        </div>
        {loading && (
          <div className="chat-bubble">
            <p>Loading...</p>
          </div>
        )}
        {error && (
          <div className="chat-bubble">
            <p>Error: {error.message}</p>
          </div>
        )}
        {weatherData && weatherData.main ? (
          <div className="chat-bubble">
            <h3>{weatherData.name}</h3>
            <p>Temperature (°C): {weatherData.main.temp}°C</p>
            <p>Temperature (°F): {convertToFahrenheit(weatherData.main.temp)}°F</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
