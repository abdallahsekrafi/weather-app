import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";

const WeatherDetails = ({ wind, humidity, pressure, visibility }) => {
  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AirIcon fontSize="small" />
          <Typography variant="body1">Wind: {wind} m/s</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <OpacityIcon fontSize="small" />
          <Typography variant="body1">Humidity: {humidity}%</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SpeedIcon fontSize="small" />
          <Typography variant="body1">Pressure: {pressure} hPa</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <VisibilityIcon fontSize="small" />
          <Typography variant="body1">Visibility: {visibility} km</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherDetails;
