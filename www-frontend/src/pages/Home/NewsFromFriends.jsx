import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 

const NewsFromFriends = () => {
  
  return (
    <Box>
      <Swiper
        spaceBetween={50}
        width={500}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Card>
            <CardContent>
              <Typography>Reseña de un amigo 1</Typography>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <CardContent>
              <Typography>Reseña de un amigo 2</Typography>
            </CardContent>
          </Card>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default NewsFromFriends;


