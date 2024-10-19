import React, { useEffect, useState, useReducer } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Pagination,
  TextField,
} from "@mui/material";
import BeerReviewForm from "./BeerReviewForm";
import makeReviewService from "../../services/reviews/makeReview";
import fetchReviewsFromUserService from "../../services/reviews/fetchReviews";
import fetchReviewsFromBeerService from "../../services/reviews/fetchReviewsFromBeer";
import useUser from "../../hooks/useUser";

const filterUserReviews = (reviews, userId) => {
  return reviews.filter((review) => review.user_id === userId);
};

const BeerDetail = ({ selectedBeer, onBack }) => {
  const { isAuthenticated, getUserData } = useUser();
  const [userBeerReviews, setUserBeerReviews] = useState([]);
  const [beerReviews, setBeerReviews] = useState([]);
  const [barsBeer, setBarsBeer] = useState([]);
  const [brewery, setBrewery] = useState(null);
  const [reviewText, setReviewText] = useState(""); // Estado para la reseña
  const [reviewRating, setReviewRating] = useState(0); // Estado para la calificación
  const [reviewSubmitMessage, setReviewSubmitMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  

  const onReviewSubmit = () => {
    const review = {
      text: reviewText,
      rating: reviewRating,
      beer_id: selectedBeer.id,
    };
    const cors = require('cors');
    app.use(cors());
    const user = getUserData();

    makeReviewService(review, user.user.id)
      .then((response) => {
        setReviewSubmitMessage("Review submitted successfully");
        // Resetea el texto de la reseña y la calificación
        setReviewText("");
        setReviewRating(0);
      })
      .catch((error) => {
        setReviewSubmitMessage("Couldn't submit review");
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = getUserData();
      fetchReviewsFromBeerService(selectedBeer.id)
        .then((response) => {
          const reviews = response.reviews;
          const userReviews = filterUserReviews(reviews, user.user.id);
          setUserBeerReviews(userReviews);
          setBeerReviews(reviews);
        })
        .catch((error) => {
          console.log("Couldn't fetch reviews:", error);
        });
    }

    if (selectedBeer) {
      fetch(`http://127.0.0.1:3001/api/v1/beers/${selectedBeer.id}`)
        .then((response) => response.json())
        .then((data) => {
          setBarsBeer(data.bars_beer || []);
          setBrewery(data.brewery || null);
        })
        .catch((error) => {
          console.error("Error fetching beer details:", error);
        });
    }
  }, [isAuthenticated, getUserData, selectedBeer]);

  return (
    <Box sx={{ color: "#fff", padding: "32px" }}>
      <Button onClick={onBack} variant="outlined" sx={{ marginBottom: "16px" }}>
        Back
      </Button>
      <Card sx={{ backgroundColor: "#fff", marginBottom: "32px" }}>
        <CardContent>
          <Typography variant="h4" color="#331a00">
            {selectedBeer.name}
          </Typography>
          <Typography variant="h6" color="#331a00">
            {selectedBeer.style}
          </Typography>
          {brewery && (
            <Typography variant="body1" color="#331a00">
              Brewery: {brewery.name}
            </Typography>
          )}
          <Typography variant="body1" color="#331a00">
            Hop: {selectedBeer.hop}
          </Typography>
          <Typography variant="body1" color="#331a00">
            Yeast: {selectedBeer.yeast}
          </Typography>
          <Typography variant="body1" color="#331a00">
            Malts: {selectedBeer.malts}
          </Typography>
          <Typography variant="body1" color="#331a00">
            IBU: {selectedBeer.ibu}
          </Typography>
          <Typography variant="body1" color="#331a00">
            Alcohol: {selectedBeer.alcohol}
          </Typography>
          <Typography variant="body1" color="#331a00">
            BLG: {selectedBeer.blg}
          </Typography>
          <Rating
            value={selectedBeer.avg_rating || 0}
            precision={0.5}
            readOnly
            sx={{ color: "#b1977a" }}
          />
        </CardContent>
      </Card>

      <Box sx={{ marginBottom: "32px" }}>
        <Typography variant="h5" color="#fff" sx={{ marginBottom: "16px" }}>
          DRINK ON
        </Typography>
        <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <Box sx={{ display: "flex", gap: "16px" }}>
            {barsBeer.length > 0 ? (
              barsBeer.map((bar) => (
                <Card key={bar.id} sx={{ backgroundColor: "#fff", color: "#331a00", width: 200, height: 200 }}>
                  <CardContent>
                    <Typography variant="h6">{bar.name}</Typography>
                    <Typography variant="body2">Address ID: {bar.address_id}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="h6" color="#fff">No bars available for this beer.</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {isAuthenticated && (
        <Box>
          <Typography variant="h5" color="#fff">Leave a Review</Typography>
          <TextField
            label="Your Review"
            multiline
            rows={4}
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ width: '100%', marginBottom: '16px' }}
          />
          <Rating
            value={reviewRating}
            onChange={(event, newValue) => {
              setReviewRating(newValue);
            }}
            precision={0.5}
            sx={{ marginBottom: '16px', color: "#b1977a" }}
          />
          <Button
            onClick={onReviewSubmit}
            sx={{
              color: "#fff",
              backgroundColor: "#b1977a",
              "&:hover": { backgroundColor: "#91673c" },
            }}
          >
            Submit Review
          </Button>
          {reviewSubmitMessage && (
            <Typography variant="body1" sx={{ color: "#b1977a", marginTop: "8px" }}>
              {reviewSubmitMessage}
            </Typography>
          )}

          <Box sx={{ marginTop: "32px" }}>
            <Typography variant="h5" color="#fff">YOUR REVIEWS</Typography>
            {userBeerReviews.map((review) => (
              <Card key={review.id} sx={{ backgroundColor: "#331a00", color: "#fff", margin: "16px 0", padding: "16px" }}>
                <CardContent>
                  <Typography variant="body1">
                    <strong>{review.user_handle || "User"}</strong>
                  </Typography>
                  <Typography variant="body1">{review.text}</Typography>
                  <Typography variant="body1">Rating: {review.rating}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BeerDetail;
