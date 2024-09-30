import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup.string().email("you must enter a valid email").required(),
  password: yup
    .string()
    .required("you must enter a password")
    .min(6, "Must be at least 6 characters"),
  userName: yup.string().required("you must enter a username"),
  firstName: yup.string().required("you must enter a first name"),
  lastName: yup.string().required("you must enter a last name"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("you must confirm your password"),
});
