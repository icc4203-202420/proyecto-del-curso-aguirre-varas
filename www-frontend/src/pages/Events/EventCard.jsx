import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, CardActionArea } from "@mui/material";

const EventCard = ({ name, description, date, onClick }) => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 2,
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
              {description}
            </Typography>
            <Typography variant="body2" color="#b1977a" component="div" sx={{ fontSize: 14 }}>
              {new Date(date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EventCard;
