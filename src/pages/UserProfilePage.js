import React from 'react'
import UserProfile from '../components/user/UserProfile'

export default function UserProfilePage(prop) {
  const { userData ,setUserData  }= prop;
  return (
    <div>
      <UserProfile userData={userData} setUserData={setUserData} />
        </div>
  )
}
