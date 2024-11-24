import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserSignUp() {
  const [userInfo, setUserInfo] = useState({
    PersonName: "",
    PersonEmail: "",
    PersonPassword: "",
    age: "",
    PersonPhoneNumber: "",
  });
  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  }

  function SignUpNewUser() {
    const UserSignUpUrl = "https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Customer";
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
          if (errorData.age) {
            alert(errorData.age[0]);
            return;
          }
          if (errorData.PersonPhoneNumber) {
            alert(errorData.PersonPhoneNumber[0]);
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
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom color="secondary">
            Sign Up
          </Typography>
          <TextField
            id="PersonName"
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={onChangeHandler}
          />
          <TextField
            id="PersonEmail"
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={onChangeHandler}
          />
          <TextField
            id="PersonPassword"
            label="Password"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={onChangeHandler}
            type="password"
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={onChangeHandler}
          />
          <TextField
            id="PersonPhoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={onChangeHandler}
          />
          <Box sx={{ width: '100%', mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
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
