import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  CardActionArea,
} from "@mui/material";
import Img1 from "../../assets/beer_image.jpeg";

const BeerCard = ({ name, style, rating, onClick }) => {
  return (
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
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, objectFit: "cover" }}
          image={Img1}
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
          <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
            <Typography component="div" variant="h6" sx={{ fontSize: 20 }}>
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="#b1977a"
              component="div"
              sx={{ fontSize: 16 }}
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
      </CardActionArea>
    </Card>
  );
};

BeerCard.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  rating: PropTypes.number,
  onClick: PropTypes.func, // Añadir prop para el clic
};

export default BeerCard;
