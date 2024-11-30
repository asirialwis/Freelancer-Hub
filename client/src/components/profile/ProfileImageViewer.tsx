import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const ProfileImageViewer: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const userId = localStorage.getItem("userId");
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/profile/${userId}`);
     
        
        if (response.data && response.data.data && response.data.data.imgUrl) {
          setImgUrl(response.data.data.imgUrl);
        } else {
          throw new Error("Image URL not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load image.");
        setImgUrl(null); // Ensure imgUrl is null when there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={2}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Avatar
          src={imgUrl || undefined} // Only pass `src` if `imgUrl` exists
          alt="Profile"
          sx={{
            width: 150,
            height: 150,
            border: "3px solid #4caf50", // Green border
            backgroundColor: imgUrl ? "transparent" : "#ffffff", // White background if no image
          }}
        />
      )}
      <Typography variant="h6" color="textSecondary" mt={2}>
        {/* {error ? error : "Profile Image"} */}
      </Typography>
    </Box>
  );
};

export default ProfileImageViewer;
