import React from 'react'
import {NavLink} from "react-router-dom"

const Usermenu = () => {
  return (
    <div>
      <ul className='dashboard-ul'>
        <div>
        <NavLink to={"/dashboard/user/orders"}>orders</NavLink>
        <NavLink to={"/dashboard/user/edit"}>Edit Profile</NavLink>
        </div>
        </ul>

    </div>
  )
}

export default Usermenu