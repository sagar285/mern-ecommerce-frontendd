import React from 'react'
import {NavLink} from "react-router-dom"

const Adminmenu = () => {
  return (
    <div>
      <ul className='dashboard-ul'>
        <div>
        <NavLink to={"/dashboard/admin/orders"}>orders</NavLink>
        <NavLink to={"/dashboard/admin/addproduct"}>Add product</NavLink>
        <NavLink to={"/dashboard/admin/products"}>products</NavLink>
        <NavLink to={"/dashboard/user/edit"}>Edit Profile</NavLink>
        </div>
        </ul>

    </div>
  )
}

export default Adminmenu