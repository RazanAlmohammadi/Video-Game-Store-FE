import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import { Button, Box, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

function getDecodedToken(token) {
  const decoded = parseJwt(token);
  console.log("Decoded token fields:", decoded);
  return decoded
    ? { email: decoded.email, role: decoded.role, nameId: decoded.nameid }
    : null;
}

export default function UserLogin({ getUserData, getSystemAdminData }) {
  const [userLogin, setUserLogin] = useState({ PersonEmail: "", PersonPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserLogin({ ...userLogin, [event.target.id]: event.target.value });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  function logInUser() {
    const userLoginUrl = "  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Person/signIn";

    axios.post(userLoginUrl, userLogin)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data;
          localStorage.setItem("token", token);

          const decodedToken = getDecodedToken(token);
          if (decodedToken) {
            console.log("Decoded token fields:", decodedToken);

            if (decodedToken.role === "Customer") {
              getUserData();
              navigate("/UserProfile");
            } else if (decodedToken.role === "SystemAdmin") {
              getSystemAdminData();
              navigate("/SystemAdminProfile");
            } else {
              alert("Unknown user role.");
            }
          }
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized: " + error.response.data.message);
        }
      });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9'
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            Login
          </Typography>
          <TextField
            id="PersonEmail"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={onChangeHandler}
            sx={{ mb: 2 }}
          />
          <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined">
            <InputLabel htmlFor="PersonPassword">Password</InputLabel>
            <Input
              id="PersonPassword"
              type={showPassword ? 'text' : 'password'}
              onChange={onChangeHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide password' : 'show password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={logInUser}
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2">
              Do not have an account yet?&nbsp;
              <Link to="/SignUp">
                <Button variant="text" color="secondary">
                  Create an account
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
