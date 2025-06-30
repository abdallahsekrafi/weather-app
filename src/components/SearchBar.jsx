import React, { useState } from "react";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useWeather } from "../hooks/useWeather";

const SearchBar = ({
  location,
  setLocation,
  setWeatherData,
  setForecastData,
}) => {
  const [inputValue, setInputValue] = useState(location);
  const { fetchWeather, loading } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const { weather, forecast } = await fetchWeather(inputValue);
      setWeatherData(weather);
      setForecastData(forecast);
      setLocation(inputValue);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const { weather, forecast } = await fetchWeather(
            `${latitude},${longitude}`
          );
          setWeatherData(weather);
          setForecastData(forecast);
          setLocation(`${weather.name}, ${weather.sys.country}`);
          setInputValue(`${weather.name}, ${weather.sys.country}`);
        } catch (error) {
          console.error("Error fetching weather by location:", error);
        }
      });
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={3}
      sx={{ width: "100%", maxWidth: "600px" }}
    >
      <OutlinedInput
        disabled={loading}
        fullWidth
        placeholder="Search for a city..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <IconButton onClick={handleLocationClick}>
              <LocationOnIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" disabled={loading}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Paper>
  );
};

export default SearchBar;
