import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserSignUp() {

  const [userInfo, setUserInfo] = useState({ PersonName: "", PersonEmail: "", PersonPassword: "" });
  function onChangeHandler(event) {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value, });
  }

  const navigate = useNavigate();
  function SignUpNewUser() {
    const UserSignUpUrl = "http://localhost:5125/api/v1/Customer";
    axios.post(UserSignUpUrl, userInfo)
    .then((response)=>{
      console.log(response)
      if(response.status===200){
        navigate("/Login");
      }
    })
    .catch((error)=>{
      console.log(error);
      if(error.status === 400){
        if(error.response.data.errors.PersonEmail){
          alert(error.response.data.errors.PersonEmail[0]);
          return;
        }
        if (error.response.data.errors.PersonPassword) {
          alert(error.response.data.errors.PersonPassword[0]);
          return;
      }
        if (error.response.data.errors.PersonName) {
          alert(error.response.data.errors.PersonName[0]);
          return;
        }
  }
  });
}
  return (
    <div>
      <h1>UserSignUp</h1>
      <TextField id="PersonName"
        label="Name" variant="standard"
        helperText="Plaese enter your name"
        onChange={onChangeHandler}
      />
      <TextField id="PersonEmail"
        label="Email" variant="standard"
        helperText="Plaese enter your email"
        onChange={onChangeHandler}
      />
      <TextField id="PersonPassword"
        label="Password" variant="standard"
        helperText="Plaese enter your password"
        onChange={onChangeHandler}
      />
      <Button variant="contained" color="error" onClick={SignUpNewUser} > SignUp</Button>
    </div>

  )
}

