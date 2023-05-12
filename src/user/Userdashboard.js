import React from 'react'
import Usermenu from '../components/Usermenu'
import { useAuth } from '../pages/Usercontext'
const Userdashboard = () => {
  const [userauth,setuserauth] =useAuth();
  return (
    <div className='dashboard'>
      <Usermenu/>
    <div className='user-detail'>
      <h1>User-detail</h1>
      <h3><span>Name:</span>{userauth?.user?.name}</h3>
      <h3><span>Email:</span>{userauth?.user?.email}</h3>
      <h3><span>Phone:</span>{userauth?.user?.phone}</h3>
      <h3><span>Address:</span>{userauth?.user?.address}</h3>
      </div>
    </div>
  )
}

export default Userdashboard