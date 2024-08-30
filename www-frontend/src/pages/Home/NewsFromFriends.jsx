import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import Img1 from "../../assets/beer_image.jpeg";
import Img2 from "../../assets/image.png";

const NewsFromFriends = () => {
  const friendsReviews = [
    { image: Img1, nickname: "r_aguirre", rating: 4 },
    { image: Img2, nickname: "javoxis", rating: 5 },
    { image: Img1, nickname: "malo_pato_mar", rating: 3 },
    
  ];

  return (
    <Box>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
      >
        {friendsReviews.map((review, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={review.image}
                alt={`Review from ${review.nickname}`}
                style={{ width: "107px", height: "156px", borderRadius: "8px" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: "#4e2b0e", mr: 1 }} />
                <Box>
                  <Typography>{review.nickname}</Typography>
                  <Typography variant="body2">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default NewsFromFriends;
