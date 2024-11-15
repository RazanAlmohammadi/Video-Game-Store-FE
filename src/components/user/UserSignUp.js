import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserSignUp() {
  const [userInfo, setUserInfo] = useState({ PersonName: "", PersonEmail: "", PersonPassword: "" });
  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  }

  function SignUpNewUser() {
    const UserSignUpUrl = "  http://localhost:5125/api/v1/Customer";
    axios.post(UserSignUpUrl, userInfo)
      .then((response) => {
        if (response.status === 200) {
          navigate("/Login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data.errors;
          if (errorData.PersonEmail) {
            alert(errorData.PersonEmail[0]);
            return;
          }
          if (errorData.PersonPassword) {
            alert(errorData.PersonPassword[0]);
            return;
          }
          if (errorData.PersonName) {
            alert(errorData.PersonName[0]);
            return;
          }
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
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            User SignUp
          </Typography>
          <TextField
            id="PersonName"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Please enter your name"
            onChange={onChangeHandler}
          />
          <TextField
            id="PersonEmail"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Please enter your email"
            onChange={onChangeHandler}
          />
          <TextField
            id="PersonPassword"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Please enter your password"
            onChange={onChangeHandler}
            type="password"
          />
          <Box sx={{ width: '100%', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={SignUpNewUser}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
