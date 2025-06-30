import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./styles/theme";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, my: 4 }}>
          {/* Part 1: Search and Theme Toggle */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: {
                xs: "100%",
                md: "60%",
              },
            }}
          >
            <SearchBar
              location={location}
              setLocation={setLocation}
              setWeatherData={setWeatherData}
              setForecastData={setForecastData}
            />
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </Box>

          {/* Part 2: Current Weather */}
          {weatherData && (
            <CurrentWeather
              weatherData={weatherData}
              forecastData={forecastData}
            />
          )}

          {/* Part 3: 5-Day Forecast */}
          {forecastData && <DailyForecast forecastData={forecastData} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
