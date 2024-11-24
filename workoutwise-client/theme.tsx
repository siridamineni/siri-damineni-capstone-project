import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#235A96",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  //Typography
  typography: {
    fontFamily: "Open Sans",
    fontSize: 16,
    h1: {
      fontSize: "3.75rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.75rem",
    },
    button: {
      fontSize: "0.75rem",
      textTransform: "capitalize",
    },
  },
});
export default theme;
