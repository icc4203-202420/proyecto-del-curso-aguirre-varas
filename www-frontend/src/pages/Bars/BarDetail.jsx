import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const BeerDetail = ({ selectedBar, onBack }) => {
  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4">{selectedBar.name}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BeerDetail;
