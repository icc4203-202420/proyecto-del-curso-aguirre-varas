import React from "react";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Profile View
      </Typography>
      <Typography variant="body1">Account Screen</Typography>
    </Box>
  );
};

export default Profile;
