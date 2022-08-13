import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

//import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#fff",
          backgroundColor: "#222",
        },
        paddingDefault: {
          padding: "0px",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#111",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#222",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#222",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: "#aaa",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#555",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#ddd",
    },
  },
  typography: {
    fontFamily: ['"Atkinson Hyperlegible"', "sans-serif"].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);

// deving with PWAs is a PITA tbh
process.env.NODE_ENV === "production"
  ? serviceWorkerRegistration.register()
  : serviceWorkerRegistration.unregister();

// might want to implement this later, but i always have GA
//reportWebVitals();
