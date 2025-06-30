import { useState } from "react";
import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const axiosConfig = { timeout: 5000 };

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`,
          axiosConfig
        ),
        axios.get(
          `${BASE_URL}/forecast?q=${location}&units=metric&appid=${API_KEY}`,
          axiosConfig
        ),
      ]);

      return {
        weather: weatherRes.data,
        forecast: forecastRes.data,
      };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch weather data");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeather, loading, error };
};
