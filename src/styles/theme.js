import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
      paper2: "#fdfdfd",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#0B131E",
      paper: "#202B3B",
      paper2: "#313d4f",
      // default: "#0F0F0F",
      // paper: "#1E1E1E",
      // paper2: "#272727",
    },
  },
});
