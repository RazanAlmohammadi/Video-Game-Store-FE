import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
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
    const userLoginUrl = "http://localhost:5125/api/v1/Person/signIn";

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
              console.log(getSystemAdminData());
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
    <div>
      <h1>UserLogin</h1>
      <TextField
        id="PersonEmail"
        label="Email"
        variant="standard"
        helperText="Please enter your email"
        onChange={onChangeHandler}
      />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="PersonPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={onChangeHandler}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button onClick={logInUser}>Login</Button>
      <div>
        <h1>Do not have an account yet?</h1>
        <Link to="/SignUp">
          <Button>Create an account</Button>
        </Link>
      </div>
    </div>
  );
}
