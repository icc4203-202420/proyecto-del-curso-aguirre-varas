import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { reviewSchema } from "../schemas/review";

const BeerReviewForm = ({ beer, open, onClose, onSubmit }) => {
  //console.log(JSON.stringify(beer));
  const formik = useFormik({
    initialValues: {
      text: "",
      rating: "",
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{beer.name} Review</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            id="text"
            name="text"
            label="Comment"
            type="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
          />
          <TextField
            fullWidth
            id="rating"
            name="rating"
            label="Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BeerReviewForm;
