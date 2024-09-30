import React from "react";

import { Box, Card, CardMedia, Typography } from "@mui/material";
import Img1 from "../../assets/event_image.jpeg";

const EventCard = ({ name, date, image, description }) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Card
        sx={{
          display: "flex",
          backgroundColor: "#3b240b",
          color: "#f0e1d2",
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 2,
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, objectFit: "cover" }}
          image={image || Img1}
          alt={name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 2,
            flex: 1,
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography>{description}</Typography>
          <Typography>{date}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default EventCard;
