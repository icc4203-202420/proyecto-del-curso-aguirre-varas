import PropTypes from "prop-types"; // Import PropTypes
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from "@mui/material";

const BeerCard = ({ name, style, rating }) => {
  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: "#3b240b",
        color: "#f0e1d2",
        borderRadius: 2,
        overflow: "hidden",
        marginTop: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "cover" }}
        image="data:image/jpeg;base64,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"
        alt={name}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 2,
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
          <Typography component="div" variant="h6" sx={{ fontSize: 18 }}>
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="#b1977a"
            component="div"
            sx={{ fontSize: 14 }}
          >
            {style}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              sx={{ color: "#b1977a" }}
            />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default BeerCard;

BeerCard.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
