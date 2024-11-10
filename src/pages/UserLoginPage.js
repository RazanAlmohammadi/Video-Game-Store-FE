import React from 'react';
import UserLogin from '../components/user/UserLogin';

export default function UserLoginPage(prop) {
  const { getUserData, getSystemAdminData } = prop;

  return (
    <div>
      <UserLogin
        getUserData={getUserData}
        getSystemAdminData={getSystemAdminData}
      />
    </div>
  );
}
