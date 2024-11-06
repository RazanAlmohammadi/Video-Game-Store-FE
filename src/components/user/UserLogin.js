import React, { useState } from 'react'
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
export default function UserLogin() {
  const [userLogin, setUserLogin] = useState({  PersonEmail: "", PersonPassword: "" });

  function onChangeHandler(event) {
    setUserLogin({ ...userLogin, [event.target.id]: event.target.value, });
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  function logInUser(){
    const userLoginUrl ="http://localhost:5125/api/v1/Person/signIn";
    axios.post(userLoginUrl,userLogin)
      .then((response)=>{
      console.log(response,"response from login");
      if (response ===200){
        localStorage.setItem("token",response.dta)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return <div><h1>UserLogin</h1>
    <TextField id="PersonEmail"
      label="Email" variant="standard"
      helperText="Plaese enter your email"
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
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    <Button onClick = {logInUser}>login</Button>
  </div>
  
}
