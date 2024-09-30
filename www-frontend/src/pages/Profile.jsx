import React from "react";
import { Box, Typography, Avatar, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { palette } from "../palette";
import Img2 from "../assets/image.png";

const generateGaussianHeight = () => {
  const heights = [20, 40, 80, 100, 120, 100, 80, 60, 40, 20];
  return heights;
};

const Profile = () => {
  const barHeights = generateGaussianHeight();

  return (
    <Box
      sx={{
        marginTop: 7,
        marginBottom: 7,
        padding: 3,
        bgcolor: "#3b1e0e",
        color: "#FFD597",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar
          sx={{ width: 120, height: 120, bgcolor: "#e5b886" }}
          alt="Profile Picture"
        />
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        Joaquín Varas
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color={palette.lager}
        gutterBottom
      >
        @joaco_varas
      </Typography>

      <Divider sx={{ my: 2, bgcolor: "#FFD597" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">FAVORITES</Typography>
        <IconButton>
          <EditIcon sx={{ color: "#FFD597" }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <img src={Img2} alt="Favorite 1" width="107" height="156" />
        <img src={Img2} alt="Favorite 2" width="107" height="156" />
        <img src={Img2} alt="Favorite 3" width="107" height="156" />
        <img src={Img2} alt="Favorite 4" width="107" height="156" />
      </Box>

      <Divider sx={{ my: 2, bgcolor: "#FFD597" }} />
      <Typography variant="h6" gutterBottom>
        RATINGS
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        {barHeights.map((height, index) => (
          <Box
            key={index}
            sx={{ width: 15, height, bgcolor: "brown", mx: 0.5 }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2, bgcolor: "#FFD597" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Beers</Typography>
        <Typography>287</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Bars</Typography>
        <Typography>15</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Following</Typography>
        <Typography>10</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Followers</Typography>
        <Typography>12</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
