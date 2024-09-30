import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { palette } from "../../palette";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";

import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

import signupService from "../../services/signup";

import { useFormik } from "formik";

import { signupSchema } from "../schemas/signup";

import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  color: palette.clear,
  backgroundColor: palette.lager,
  borderRadius: 2,
  marginBottom: "16px",
  "& label.Mui-focused": {
    color: palette.background,
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    errorMsg: "",
  });
  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); */

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setState({ ...state, isLoading: true });

      signupService(
        values.email,
        values.firstName,
        values.lastName,
        values.userName,
        values.password,
        values.passwordConfirmation
      )
        .then((response) => {
          setState({ isLoading: false, isError: false, errorMsg: "" });
          console.log(response);
          navigate("/login");
        })
        .catch((error) => {
          setState({
            isLoading: false,
            isError: true,
            errorMsg: error.toJSON().message.response.data.status.message,
          });
        });
    },
    validationSchema: signupSchema,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* const handleSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, isLoading: true });
    signupService(
      email,
      firstName,
      lastName,
      userName,
      password,
      passwordConfirmation
    )
      .then((response) => {
        setState({ isLoading: false, isError: false, errorMsg: "" });
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        setState({
          isLoading: false,
          isError: true,
          errorMsg: error.toJSON().message.response.data.status.message,
        });
      });
  }; */

  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      navigate("/");
    }
    //console.log("aurhenticateddawdwa  ");
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: "300px",
            textAlign: "center",
            p: 3,
            backgroundColor: palette.background,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: palette.clear, mb: 2 }}
          >
            Cheladvisor
          </Typography>

          <FormControl variant="standard" sx={{ marginBottom: "16px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="filled"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="firstName"
                  label="First Name"
                  variant="filled"
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  variant="filled"
                  value={formik.values.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="userName"
                  label="User Name"
                  variant="filled"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  helperText={formik.touched.userName && formik.errors.userName}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="password"
                  label="Password"
                  variant="filled"
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="passwordConfirmation"
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  value={formik.values.passwordConfirmation}
                  helperText={
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                  }
                  error={
                    formik.touched.passwordConfirmation &&
                    Boolean(formik.errors.passwordConfirmation)
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#8D6E63",
                color: "#FFF",
                ":hover": { backgroundColor: "#6D4C41" },
              }}
            >
              Sign up
            </Button>
            {state.isLoading && <h2>Loading...</h2>}
            {state.isError && <h2>{state.errorMsg}</h2>}
          </FormControl>
          <Typography variant="body2" sx={{ color: palette.lager }}>
            Already have an account?
          </Typography>
          <Button component={Link} to="/login">
            Sign in
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
