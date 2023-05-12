import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../pages/Usercontext'
import { useCart } from '../pages/Cartcontext'
const Navbar = () => {
  const [userauth,setuserauth]=useAuth();
  const [cart,setcart] =useCart();

  function logout(){
    setuserauth({...userauth,user:null,token:""});
    localStorage.removeItem("auth")
  }


  return (
    <main>
        <nav className='main-nav'>
            <ul>
              <li>
            <NavLink to={"/"}>Ecommerce-web</NavLink>
              </li>
            {
              userauth?.user ?(
                <div>
                <li>
              <NavLink to={`/dashboard/${userauth?.user?.role===1 ? "admin":"user"}`}>Dashboard</NavLink>
                </li>
                <li>
              <NavLink onClick={logout} to={"/login"}>Logout</NavLink>
                </li>
                <li>
              <NavLink to={"/cart"}>Cart ({cart?.length})</NavLink>
                </li>
                </div>
              ):(
                <div>
                <li>
              <NavLink to={"/register"}>Signup</NavLink>
                </li>
                <li>
              <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li>
              <NavLink to={"/cart"}>Cart ({cart?.length})</NavLink>
                </li>
                </div>
              )
            }
            </ul>
        </nav>
    </main>
  )
}

export default Navbar