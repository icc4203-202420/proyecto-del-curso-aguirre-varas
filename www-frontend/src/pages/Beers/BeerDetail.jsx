import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

const BeerDetail = ({ selectedBeer, onBack }) => {
  return (
    <Box sx={{ marginTop: "64px", padding: "16px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4">{selectedBeer.name}</Typography>
          <Typography variant="h6">{selectedBeer.style}</Typography>
          <Typography variant="body1">Hop: {selectedBeer.hop}</Typography>
          <Typography variant="body1">Yeast: {selectedBeer.yeast}</Typography>
          <Typography variant="body1">Malts: {selectedBeer.malts}</Typography>
          <Typography variant="body1">IBU: {selectedBeer.ibu}</Typography>
          <Typography variant="body1">Alcohol: {selectedBeer.alcohol}</Typography>
          <Typography variant="body1">BLG: {selectedBeer.blg}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BeerDetail;

