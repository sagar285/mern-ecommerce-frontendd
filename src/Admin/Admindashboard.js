import React from 'react'
import Adminmenu from '../components/Adminmenu';
import { useAuth } from '../pages/Usercontext'
const Admindashboard = () => {
  const [userauth,setuserauth] =useAuth();
  return (
    <div className='dashboard'>
      <Adminmenu/>
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

export default Admindashboard