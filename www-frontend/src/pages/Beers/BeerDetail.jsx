import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Pagination,
} from "@mui/material";
import BeerReviewForm from "./BeerReviewForm";
import makeReviewService from "../../services/reviews/makeReview";
import fetchReviewsFromUserService from "../../services/reviews/fetchReviews";
import fetchReviewsFromBeerService from "../../services/reviews/fetchReviewsFromBeer";
import useUser from "../../hooks/useUser";

const filterUserReviews = (reviews, selectedBeerId) => {
  return reviews.filter((review) => review.beer_id === selectedBeerId);
};

const BeerDetail = ({ selectedBeer, onBack }) => {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, getUserData } = useUser();
  const [userBeerReviews, setUserBeerReviews] = useState([]);
  const [beerReviews, setBeerReviews] = useState([]); // Estado para las reviews
  const [barsBeer, setBarsBeer] = useState([]); // Estado para los bares
  const [brewery, setBrewery] = useState(null); // Estado para la cervecería
  const [reviewsState, setReviewsState] = useState({
    isLoading: true,
    isError: false,
    errorMsg: "",
  });
  const [reviewSubmitMessage, setReviewSubmitMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

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
        setReviewSubmitMessage("Couldn't submit review");
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = getUserData();
      fetchReviewsFromUserService(user.user.id)
        .then((response) => {
          setUserBeerReviews(() => {
            return filterUserReviews(response.reviews, selectedBeer.id);
          });
          setReviewsState({ isLoading: false, isError: false, errorMsg: "" });
        })
        .catch((error) => {
          setReviewsState({
            isLoading: false,
            isError: true,
            errorMsg: "Couldn't fetch reviews",
          });
          console.log(error);
        });
      fetchReviewsFromBeerService(selectedBeer.id)
        .then((response) => {
          setBeerReviews(response.reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Verifica si una cerveza ha sido seleccionada y obtiene los bares asociados
    if (selectedBeer) {
      fetch(`http://127.0.0.1:3001/api/v1/beers/${selectedBeer.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Received bars_beer data:", data.bars_beer); // Línea para depuración
          setBarsBeer(data.bars_beer || []); // Actualiza los bares de la cerveza
          setBrewery(data.brewery || null); // Actualiza la cervecería
        })
        .catch((error) => {
          console.error("Error fetching beer details:", error);
        });
    }

    const timeout = setTimeout(() => {
      setReviewSubmitMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, getUserData, selectedBeer, reviewSubmitMessage]);

  // Paginación
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = userBeerReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ color: "#fff", padding: "32px" }}>
      <Button
        onClick={onBack}
        variant="outlined"
        sx={{
          marginBottom: "16px",
          color: "#fff",
          borderColor: "#b1977a",
          "&:hover": {
            borderColor: "#fff",
          },
        }}
      >
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

      {/* Sección de bares */}
      <Box sx={{ marginBottom: "32px" }}>
        <Typography variant="h5" color="#fff" sx={{ marginBottom: "16px" }}>
          DRINK ON
        </Typography>
        <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <Box sx={{ display: "flex", gap: "16px" }}>
            {barsBeer.length > 0 ? (
              barsBeer.map((bar) => (
                <Card
                  key={bar.id}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#331a00",
                    width: 200,
                    height: 200,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{bar.name}</Typography>
                    <Typography variant="body2">
                      Address ID: {bar.address_id}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="h6" color="#fff">
                No bars available for this beer.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {isAuthenticated && (
        <Box>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{
              color: "#fff",
              backgroundColor: "#b1977a",
              "&:hover": {
                backgroundColor: "#91673c",
              },
            }}
          >
            Review this beer
          </Button>
          {reviewSubmitMessage && (
            <Typography
              variant="body1"
              sx={{ color: "#b1977a", marginTop: "8px" }}
            >
              {reviewSubmitMessage}
            </Typography>
          )}
          <BeerReviewForm
            beer={selectedBeer}
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            onSubmit={onReviewSubmit}
          />
          <Box sx={{ marginTop: "32px" }}>
            <Typography variant="h5" color="#fff">
              Your REVIEWS
            </Typography>
            {reviewsState.isLoading && <Typography>Loading...</Typography>}
            {reviewsState.isError && (
              <Typography>{reviewsState.errorMsg}</Typography>
            )}
            {!reviewsState.isLoading &&
              currentReviews.length > 0 &&
              currentReviews.map((review) => (
                <Card
                  key={review.id}
                  sx={{
                    backgroundColor: "#331a00",
                    color: "#fff",
                    margin: "16px 0",
                    padding: "16px",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">
                      <strong>{review.user_handle || "User"}</strong>
                    </Typography>
                    <Typography variant="body1">{review.text}</Typography>
                    <Typography variant="body1">
                      Rating: {review.rating}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            {/* Paginación */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Pagination
                count={Math.ceil(beerReviews.length / reviewsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: "32px" }}>
            <Typography variant="h5" color="#fff">
              All REVIEWS
            </Typography>
            {reviewsState.isLoading && <Typography>Loading...</Typography>}
            {reviewsState.isError && (
              <Typography>{reviewsState.errorMsg}</Typography>
            )}
            {!reviewsState.isLoading &&
              beerReviews.length > 0 &&
              beerReviews.map((review) => (
                <Card
                  key={review.id}
                  sx={{
                    backgroundColor: "#331a00",
                    color: "#fff",
                    margin: "16px 0",
                    padding: "16px",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">
                      <strong>{review.user_handle || "User"}</strong>
                    </Typography>
                    <Typography variant="body1">{review.text}</Typography>
                    <Typography variant="body1">
                      Rating: {review.rating}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            {/* Paginación */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Pagination
                count={Math.ceil(beerReviews.length / reviewsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BeerDetail;
