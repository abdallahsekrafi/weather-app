import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";

const CurrentWeather = ({ weatherData, forecastData }) => {
  const { name, sys, main, weather, wind, visibility, dt } = weatherData;
  const { sunrise, sunset } = sys;

  const date = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Card sx={{ flex: 1.5, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* City Name */}
              <Grid item xs={12}>
                <Typography variant="h4" component="h2">
                  {name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Grid>
              {/* Date and Temperature */}
              <Grid item xs={12} md={6}>
                <Typography variant="h1" component="div">
                  {Math.round(main.temp)}°C
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {weather[0].description}
                </Typography>
              </Grid>
              {/* Weather Icon and Min/Max Temp */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].description}
                    style={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography variant="body1">
                      H: {Math.round(main.temp_max)}°C
                    </Typography>
                    <Typography variant="body1">
                      L: {Math.round(main.temp_min)}°C
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {/* Weather Details */}
              <Grid item xs={12}>
                <WeatherDetails
                  wind={wind.speed}
                  humidity={main.humidity}
                  pressure={main.pressure}
                  visibility={visibility / 1000}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Sunrise/Sunset */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            flex: 1,
            alignContent: "start",
            gap: 2,
            alignItems: "start",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              boxShadow: 3,
              borderRadius: 3,
              justifyContent: "center",
              paddingTop: { xs: "4px" },
              alignItems: "center",
            }}
          >
            <img width={"48px"} src="/sunrise.svg" alt="Sunrise image" />
            <h1
              style={{
                fontSize: "1em",
                padding: "2px 6px",
                borderRadius: "8px",
              }}
            >
              {new Date(sunrise * 1000).toLocaleTimeString()}
            </h1>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              boxShadow: 3,
              borderRadius: 3,
              justifyContent: "center",
              paddingTop: { xs: "4px" },
              alignItems: "center",
            }}
          >
            <img width={"48px"} src="/sunset.svg" alt="Sunrise image" />
            <h1
              style={{
                fontSize: "1em",
                padding: "2px 6px",
                borderRadius: "8px",
              }}
            >
              {new Date(sunset * 1000).toLocaleTimeString()}
            </h1>
          </Card>
        </Box>
      </Box>
      {/* Hourly Forecast */}

      <Card
        sx={{
          flex: 2,
          boxShadow: 3,
          borderRadius: 3,
          width: {
            xs: "100%", // pour extra small screens
            md: "60%", // pour medium screens et plus
          },
        }}
      >
        <CardContent>
          <HourlyForecast forecastData={forecastData} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CurrentWeather;
