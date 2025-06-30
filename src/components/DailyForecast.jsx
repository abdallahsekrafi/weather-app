import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HourlyForecastItem from "./HourlyForecastItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`daily-forecast-tabpanel-${index}`}
      aria-labelledby={`daily-forecast-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            color: "white",
            borderRadius: index == 0 ? "0 8px 8px 8px" : "8px",
            boxShadow: 3,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

const DailyForecast = ({ forecastData }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Group forecasts by day (excluding current day)
  const dailyForecasts = {};
  const currentDate = new Date().toDateString();

  forecastData.list.forEach((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    const dateString = forecastDate.toDateString();

    if (dateString !== currentDate) {
      const dayKey = forecastDate.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = [];
      }
      dailyForecasts[dayKey].push(forecast);
    }
  });

  const days = Object.keys(dailyForecasts).slice(0, 5);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "60%",
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        5-Day Forecast
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none", // Cacher la barre d'indicateur
          },
          "& .MuiTab-root": {
            color: "border.main",
            fontWeight: 600,
          },
          "& .Mui-selected": {
            backgroundColor: "background.paper",
            color: "primary.main !important",
            borderRadius: "8px 8px 0 0",
            boxShadow: 3,
          },
        }}
      >
        {days.map((day, index) => (
          <Tab
            key={day}
            label={
              isSmallScreen
                ? day.split(",")[0].substring(0, 3) + "."
                : day.split(" ")[0]
            } // Show just weekday
            sx={{
              minWidth: "unset",
            }}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {days.map((day, index) => (
        <TabPanel key={day} value={value} index={index}>
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
            {dailyForecasts[day].map((forecast, idx) => (
              <HourlyForecastItem key={idx} forecast={forecast} />
            ))}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

function a11yProps(index) {
  return {
    id: `daily-forecast-tab-${index}`,
    "aria-controls": `daily-forecast-tabpanel-${index}`,
  };
}

export default DailyForecast;
