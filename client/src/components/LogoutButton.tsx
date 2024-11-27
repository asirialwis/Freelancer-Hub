import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            // Call the backend logout endpoint
            await axios.post("http://localhost:5000/auth/logout", {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${refreshToken}`, // Add the access token to the request
                },
            });

            localStorage.clear();
            alert("Logged out successfully");

            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Logout
        </button>
    );
};

export default LogoutButton;
