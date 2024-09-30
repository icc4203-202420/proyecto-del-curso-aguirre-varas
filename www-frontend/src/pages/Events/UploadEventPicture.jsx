import React, { useState } from "react";
import {
  Modal,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { postEventPicture } from "../../services/event_pictures/eventPictures";

const UploadEventPicture = ({ selectedEvent, jwt }) => {
  const [open, setOpen] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setPictureUrl("");
    setDescription("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureUrl(reader.result); // Convert to Base64
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!pictureUrl || !description) {
      console.error("Please provide a valid image and description.");
      return;
    }

    try {
      const response = await postEventPicture(
        selectedEvent.id,
        pictureUrl,
        jwt,
        description
      );
      console.log(response);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Picture</Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            mt: 5,
            p: 2,
            bgcolor: "white",
            borderRadius: 1,
          }}
        >
          <DialogTitle>Upload Picture</DialogTitle>
          <DialogContent>
            <input
              accept="image/*"
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-button">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {file && <p>{file.name}</p>}
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
};

export default UploadEventPicture;
