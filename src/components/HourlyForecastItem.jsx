import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HourlyForecastItem = ({ forecast }) => {
  const time = new Date(forecast.dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
  });

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: 1,
        // borderColor: "border.main",
        p: 1,
        borderRadius: 16,
        bgcolor: "background.paper2",
      }}
    >
      <Typography variant="subtitle2">{time}</Typography>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
        alt={forecast.weather[0].description}
        style={{ width: 40, height: 40 }}
      />
      <Typography variant="body2">
        {Math.round(forecast.main.temp)}°C
      </Typography>
    </Paper>
  );
};

export default HourlyForecastItem;
