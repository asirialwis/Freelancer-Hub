import  { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "./LogoutButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue theme color
    },
    secondary: {
      main: "#ffffff", // White for text/icons
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const username = localStorage.getItem("username");

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.refresh) {
      // Clear the refresh state to prevent further reloads
      navigate(location.pathname, { replace: true }); // Replace the history entry
      window.location.reload(); // Force a single refresh
    }
  }, [location, navigate]);
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Freelance-Hub
          </Typography>
          <Button color="secondary" variant="outlined" sx={{ marginRight: 1 }} onClick={()=>navigate("/contact")}>
            Contact Us
          </Button>
          <Button color="secondary" variant="outlined" sx={{ marginRight: 1 }} onClick={() => navigate("/signup")}>
            Sign UP
          </Button>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ minHeight: "80vh", padding: "1rem" }}
      >
        <Typography variant="h4" color="primary">
          Hi {username} ! Welcome Back
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Explore Now
        </Button>
      </Stack>
    </ThemeProvider>
  );
}


