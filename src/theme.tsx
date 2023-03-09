import { createTheme } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#ba95cd",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#be5bef",
    },
    action: {
      disabled: "#ba95cd",
    },
  },

  typography: {
    fontFamily: "futura-pt",

    button: {
      textTransform: "none",
      contained: {
        color: "white",
      },
    },
  },
});

export default themeOptions;
