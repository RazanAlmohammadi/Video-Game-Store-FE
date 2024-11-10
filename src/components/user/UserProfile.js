import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import './UserProfile.css';

export default function UserProfile({ userData, setUserData }) {
  const [newAge, setNewAge] = useState(userData.age || "");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newName, setNewName] = useState(userData.personName || "");
  const [newPhoneNumber, setNewPhoneNumber] = useState(userData.personPhoneNumber || "");
  const [newProfilePicture, setNewProfilePicture] = useState(userData.personProfilePicture || "");

  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const token = localStorage.getItem("token");

  function onChangeHandler(event, setFunction) {
    setFunction(event.target.value);
  }

  function updateAge() {
    axios.put(`http://localhost:5125/api/v1/customer/updateAge?age=${newAge}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUserData((prevData) => ({ ...prevData, age: newAge }));
        setIsEditingAge(false);
      })
      .catch((error) => console.log("Age update error:", error));
  }

  function updatePassword() {
    axios.put(`http://localhost:5125/api/v1/person/updatePassword`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert("Password updated successfully");
        setIsEditingPassword(false);
      })
      .catch((error) => console.log("Password update error:", error));
  }

  function updateName() {
    axios.put(`http://localhost:5125/api/v1/person/updateName?name=${newName}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUserData((prevData) => ({ ...prevData, personName: newName }));
        setIsEditingName(false);
      })
      .catch((error) => console.log("Name update error:", error));
  }

  function updatePhoneNumber() {
    axios.put(`http://localhost:5125/api/v1/person/updatePhone?newPhone=${newPhoneNumber}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUserData((prevData) => ({ ...prevData, personPhoneNumber: newPhoneNumber }));
        setIsEditingPhoneNumber(false);
      })
      .catch((error) => console.log("Phone number update error:", error));
  }

  function updateProfilePicture() {
    axios.put(`http://localhost:5125/api/v1/person/updateProfilePicture?picturePath=${newProfilePicture}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUserData((prevData) => ({ ...prevData, personProfilePicture: newProfilePicture }));
        setIsEditingProfilePicture(false);
      })
      .catch((error) => console.log("Profile picture update error:", error));
  }

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
    alert("Logged out successfully.");
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">User Profile</h1>
      <div className="profile-info-container">
       
        <div className="profile-picture-container">
          <img
            src={userData.personProfilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-picture"
          />
          <Button variant="contained" color="secondary" onClick={() => setIsEditingProfilePicture(true)}>
            Edit Profile Picture
          </Button>
          {isEditingProfilePicture && (
            <div>
              <TextField
                label="New Profile Picture URL"
                variant="standard"
                value={newProfilePicture}
                onChange={(e) => onChangeHandler(e, setNewProfilePicture)}
              />
              <Button onClick={updateProfilePicture}>Save</Button>
              <Button onClick={() => setIsEditingProfilePicture(false)}>Cancel</Button>
            </div>
          )}
        </div>

        <div className="profile-info">
          <p>Email: {userData.personEmail}</p>
        </div>
        <div className="profile-info">
          <p>First Name: {userData.personName}</p>
          <Button variant="contained" color="secondary" onClick={() => setIsEditingName(true)}>
            Edit Name
          </Button>
          {isEditingName && (
            <div>
              <TextField
                label="New Name"
                variant="standard"
                value={newName}
                onChange={(e) => onChangeHandler(e, setNewName)}
              />
              <Button onClick={updateName}>Save</Button>
              <Button onClick={() => setIsEditingName(false)}>Cancel</Button>
            </div>
          )}
        </div>
        <div className="profile-info">
          <p>Phone Number: {userData.personPhoneNumber}</p>
          <Button variant="contained" color="secondary" onClick={() => setIsEditingPhoneNumber(true)}>
            Edit Phone Number
          </Button>
          {isEditingPhoneNumber && (
            <div>
              <TextField
                label="New Phone Number"
                variant="standard"
                value={newPhoneNumber}
                onChange={(e) => onChangeHandler(e, setNewPhoneNumber)}
              />
              <Button onClick={updatePhoneNumber}>Save</Button>
              <Button onClick={() => setIsEditingPhoneNumber(false)}>Cancel</Button>
            </div>
          )}
        </div>
        <div className="profile-info">
          <p>Age: {userData.age}</p>
          <Button variant="contained" color="secondary" onClick={() => setIsEditingAge(true)}>
            Edit Age
          </Button>
          {isEditingAge && (
            <div>
              <TextField
                label="Age"
                variant="standard"
                value={newAge}
                onChange={(e) => onChangeHandler(e, setNewAge)}
              />
              <Button onClick={updateAge}>Save</Button>
              <Button onClick={() => setIsEditingAge(false)}>Cancel</Button>
            </div>
          )}
        </div>
        <div className="profile-info">
          <Button variant="contained" color="secondary" onClick={() => setIsEditingPassword(true)}>
            Edit Password
          </Button>
          {isEditingPassword && (
            <div>
              <TextField
                label="Old Password"
                variant="standard"
                value={oldPassword}
                onChange={(e) => onChangeHandler(e, setOldPassword)}
              />
              <TextField
                label="New Password"
                variant="standard"
                value={newPassword}
                onChange={(e) => onChangeHandler(e, setNewPassword)}
              />
              <Button onClick={updatePassword}>Save</Button>
              <Button onClick={() => setIsEditingPassword(false)}>Cancel</Button>
            </div>
          )}
        </div>
        <Button variant="contained" color="error" onClick={logOutHandler}>Log Out</Button>
      </div>
    </div>
  );
}
