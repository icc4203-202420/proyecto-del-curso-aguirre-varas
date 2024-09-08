import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
} from "@mui/material";

import BeerReviewForm from "./BeerReviewForm";

import makeReviewService from "../../services/reviews/makeReview";
import fetchReviewsFromUserService from "../../services/reviews/fetchReviews";

import useUser from "../../hooks/useUser";

const filterUserReviews = (reviews, selectedBeerId) => {
  return reviews.filter((review) => review.beer_id === selectedBeerId);
};

const BeerDetail = ({ selectedBeer, onBack }) => {
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated, getUserData } = useUser();

  const [beerReviews, setBeerReviews] = useState([]);

  const [reviewsState, setReviewsState] = useState({
    isLoading: true,
    isError: false,
    errorMsg: "",
  });

  const [reviewSubmitMessage, setReviewSubmitMessage] = useState("");

  const onReviewSubmit = (values) => {
    const review = {
      text: values.text,
      rating: values.rating,
      beer_id: selectedBeer.id,
    };
    const user = getUserData();
    makeReviewService(review, user.user.id)
      .then((response) => {
        setReviewSubmitMessage("Review submitted successfully");
      })
      .catch((error) => {
        setReviewSubmitMessage("Couldnt submit review");
        //console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = getUserData();
      fetchReviewsFromUserService(user.user.id)
        .then((response) => {
          setBeerReviews(() => {
            return filterUserReviews(response.reviews, selectedBeer.id);
          });
          setReviewsState({ isLoading: false, isError: false, errorMsg: "" });
          //console.log(response.reviews);
        })
        .catch((error) => {
          setReviewsState({
            isLoading: false,
            isError: true,
            errorMsg: "Couldnt fetch reviews",
          });
          console.log(error);
        });
    }
    const timeout = setTimeout(() => {
      setReviewSubmitMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, getUserData, selectedBeer, reviewSubmitMessage]);

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
          <Typography variant="body1">
            Alcohol: {selectedBeer.alcohol}
          </Typography>
          <Typography variant="body1">BLG: {selectedBeer.blg}</Typography>
          <Rating
            value={selectedBeer.avg_rating}
            precision={0.5}
            readOnly
            sx={{ color: "#b1977a" }}
          />
        </CardContent>
      </Card>
      {isAuthenticated && (
        <Box>
          <Box>
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Review this beer!
            </Button>
            {reviewSubmitMessage && (
              <Typography variant="body1">{reviewSubmitMessage}</Typography>
            )}
            <BeerReviewForm
              beer={selectedBeer}
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              onSubmit={onReviewSubmit}
            />
          </Box>
          <Box>
            <Typography variant="h5">Your Reviews for this beer</Typography>
            {reviewsState.isLoading && <Typography>Loading...</Typography>}
            {reviewsState.isError && (
              <Typography>{reviewsState.errorMsg}</Typography>
            )}

            {!reviewsState.isLoading &&
              beerReviews.length > 0 &&
              beerReviews.map((review) => (
                <Card key={review.id} sx={{ margin: "2rem" }}>
                  <CardContent>
                    <Typography variant="body1">{review.text}</Typography>
                    <Typography variant="body1">
                      Rating: {review.rating}
                    </Typography>
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
