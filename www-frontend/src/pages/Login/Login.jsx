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
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  color: palette.clear,
  backgroundColor: palette.lager,
  borderRadius: 2,
  marginBottom: "16px",
  "& label.Mui-focused": {
    color: palette.background,
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoading, isError, errorMsg } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
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
          <CheladvisorIcon />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: palette.clear, mb: 2 }}
          >
            CHELADVISOR
          </Typography>
          <FormControl variant="standard" sx={{ marginBottom: "16px" }}>
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
              Sign in
            </Button>
            {isLoading && <h2>Loading...</h2>}
            {isError && <h2>{errorMsg}</h2>}
          </FormControl>
          <Button component={Link} to="/signup">
            create an account
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
