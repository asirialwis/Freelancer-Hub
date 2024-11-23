import React, { useState, FormEvent } from "react";
import { TextField, Button, Typography, Stack, createTheme, ThemeProvider } from "@mui/material";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure proper import
// import LogoutButton from "./LogoutButton";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue theme color
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Roboto font
  },
});

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<{
        data: { accessToken: string; refreshToken: string };
      }>("/auth/login", { email, password });

      const { accessToken, refreshToken } = response.data.data;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode the refreshToken to extract user details
      const decodedToken: { userId: string; username: string; email: string } = jwtDecode(refreshToken);

      localStorage.setItem("userId", decodedToken.userId);
      localStorage.setItem("username", decodedToken.username);
      localStorage.setItem("email", decodedToken.email);

      // Navigate to the home page
      navigate("/home", { state: { refresh: true } });

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{ marginTop: "1rem" }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: theme.palette.primary.main }}>
              Sign Up
            </a>
          </Typography>
          {/* <LogoutButton /> */}
        </div>
      </Stack>
    </ThemeProvider>
  );
};

export default Login;
