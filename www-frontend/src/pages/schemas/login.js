import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("you must enter a valid email").required(),
  password: yup.string().required("you must enter a password"),
});
