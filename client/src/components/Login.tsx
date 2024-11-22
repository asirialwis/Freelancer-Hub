import React, { useState, FormEvent } from "react";
import api from "../auth/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {jwtDecode} from "jwt-decode";


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

      // Navigate to the contact form
      navigate("/home");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
        <LogoutButton />
    </div>
  );
};

export default Login;
