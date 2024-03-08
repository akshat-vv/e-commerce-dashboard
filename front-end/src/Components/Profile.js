import React from 'react'

const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));

  return (
      <h2>Hello {user.name}</h2>
  )
}

export default Profile