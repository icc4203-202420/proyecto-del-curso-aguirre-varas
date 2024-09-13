import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .positive("rating must be positive")
    .required("rating is required")
    .min(1, "rating must bew between 1 and 5")
    .max(5, "rating must bew between 1 and 5"),
  text: yup
    .string("Enter your comment")
    .required("you must put a comment")
    .min(15, "Your comment must be at least 15 characters!")
    .max(255),
});
