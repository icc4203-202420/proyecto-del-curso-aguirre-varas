import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImgPlaceholder from "../../assets/beer_image.jpeg"; 
import axios from "axios";

const NewsFromFriends = () => {
  const [reviews, setReviews] = useState([]);
  const [beers, setBeers] = useState({}); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/v1/reviews");
        const fetchedReviews = response.data.reviews;
        setReviews(fetchedReviews);

        const beerPromises = fetchedReviews.map((review) =>
          axios.get(`http://127.0.0.1:3001/api/v1/beers/${review.beer_id}`)
        );

        const beerResponses = await Promise.all(beerPromises);

        const beerMap = beerResponses.reduce((acc, beerResponse) => {
          const beer = beerResponse.data.beer; 
          acc[beer.id] = beer.name;
          return acc;
        }, {});

        setBeers(beerMap);
      } catch (error) {
        console.error("Error fetching reviews or beers:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box>
      <Swiper spaceBetween={10} slidesPerView={4}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={ImgPlaceholder}
                  alt={`Review from ${review.user_handle}`}
                  style={{ width: "107px", height: "120px", borderRadius: "8px" }}
                />
                <Typography variant="subtitle2" sx={{ mt: 0.5, fontWeight: "bold" }}>
                  {beers[review.beer_id] || "Cerveza desconocida"}
                </Typography>
                <Typography sx={{ mt: 1 }}>{review.user_handle}</Typography>

                
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 0.5 }}>
                  <Typography variant="body2">
                    {"★".repeat(Math.floor(review.rating)) + "☆".repeat(5 - Math.floor(review.rating))}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <Typography>No reviews found</Typography> 
        )}
      </Swiper>
    </Box>
  );
};

export default NewsFromFriends;
