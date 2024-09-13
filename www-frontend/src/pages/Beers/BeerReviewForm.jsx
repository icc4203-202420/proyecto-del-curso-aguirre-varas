import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { reviewSchema } from "../schemas/review";

const BeerReviewForm = ({ beer, open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      text: "",
      rating: 0, // Inicializamos con 0 para la calificación
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
          <Rating
            id="rating"
            name="rating"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              formik.setFieldValue("rating", newValue); // Actualiza la calificación
            }}
            onBlur={formik.handleBlur}
            precision={0.5} // Permite calificaciones con incrementos de 0.5
            sx={{ marginTop: "16px" }}
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
