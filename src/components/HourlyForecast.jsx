import React from "react";
import { Box, Typography } from "@mui/material";
import HourlyForecastItem from "./HourlyForecastItem";

const HourlyForecast = ({ forecastData }) => {
  // Get current date
  const currentDate = new Date().toDateString();

  // Filter forecasts for current day only
  const hourlyForecasts = forecastData.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000).toDateString();
    return forecastDate === currentDate;
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Today's Hourly Forecast
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          p: 1,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        {hourlyForecasts.map((forecast, index) => (
          <HourlyForecastItem key={index} forecast={forecast} />
        ))}
      </Box>
    </Box>
  );
};

export default HourlyForecast;
