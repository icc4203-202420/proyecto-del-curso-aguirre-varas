// User.jsx
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, CardActionArea } from "@mui/material";

const UserCard = ({ firstName, lastName, age, handle, onClick }) => {
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
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle1" color="#b1977a" component="div" sx={{ fontSize: 16 }}>
              Age: {age}
            </Typography>
            <Typography variant="subtitle2" color="#b1977a" component="div" sx={{ fontSize: 16 }}>
              Handle: {handle}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  handle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default UserCard;
