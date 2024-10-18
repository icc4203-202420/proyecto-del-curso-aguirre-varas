import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchEventPictures } from "../../services/event_pictures/eventPictures";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const EventPictures = ({ eventId }) => {
  const [eventPictures, setEventPictures] = useState([]);

  useEffect(() => {
    fetchEventPictures(eventId)
      .then((data) => {
        setEventPictures(data.event_pictures);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventId]);

  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {eventPictures.length > 0 &&
          eventPictures.map((item) => (
            <ImageListItem key={item.imgage_url}>
              <img
                srcSet={`${item.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.imgage_url}?w=164&h=164&fit=crop&auto=format`}
                alt={item.description}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>

      {eventPictures.length > 0 &&
        eventPictures.map((picture) => (
          <Box key={picture.id + picture.user.id} sx={{ padding: "16px" }}>
            <Typography>{picture.user.handle}</Typography>
            <img
              key={picture.id}
              src={picture.image_url}
              alt={picture.description}
              style={{ width: "100%", height: "auto" }}
            />
            <Typography>{picture.description}</Typography>
          </Box>
        ))}
      {eventPictures.length === 0 && <Typography>No pictures yet</Typography>}
    </>
  );
};

export default EventPictures;
