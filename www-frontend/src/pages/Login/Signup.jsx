import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import CheladvisorIcon from "../globalComponents/icons/CheladvisorIcon";
import { palette } from "../../palette";
import { alpha, styled } from "@mui/material/styles";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateLength = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      userName.length > 0 &&
      passwordConfirmation.length > 0
    );
  };

  const handleSubmit = (event) => {
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
  };

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
        onSubmit={handleSubmit}
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
                  id="email-field"
                  label="Email"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="first-name-field"
                  label="First Name"
                  variant="filled"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="last-name-field"
                  label="Last Name"
                  variant="filled"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  fullWidth
                  id="user-name-field"
                  label="User Name"
                  variant="filled"
                  onChange={(e) => setUserName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CssTextField
                  id="password-field"
                  label="Password"
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
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
                  id="password-confirmation-field"
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            {state.isError && <h2>Please try again</h2>}
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
