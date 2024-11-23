import { Stack, TextField, Typography, createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make API call
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup successful:", response.data);

      // Navigate to login on success
      navigate("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }} // Light gray background
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
            backgroundColor: "white", // Card-like appearance
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
            <TextField
              name="username"
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.username}
              onChange={handleChanges}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.email}
              onChange={handleChanges}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.password}
              onChange={handleChanges}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChanges}
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
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: theme.palette.primary.main }}>
              Login
            </a>
          </Typography>
        </div>
      </Stack>
    </ThemeProvider>
  );
};

export default SignUp;
