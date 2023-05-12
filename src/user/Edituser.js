import React, { useEffect, useState } from "react";
import { useAuth } from "../pages/Usercontext";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const Edituser = () => {
  const [userauth, setuserauth] = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const navigate =useNavigate();


   const updateuser =async(e)=>{
    e.preventDefault();
    const {data} =await axios.put(`http://localhost:8080/edit`,{
        name,email,phone,address
    })
     if(data){
        setuserauth({...userauth,user:data.updateuser});
        let ls = localStorage.getItem("auth")
        ls =JSON.parse(ls);
        ls.user =data;
        localStorage.setItem("auth",JSON.stringify(ls));
        if(userauth?.user?.role===1){
            navigate("/dashboard/admin");
        }else{
            navigate("/dashboard/user");
        }
     }
   }



  useEffect(() => {
    const { name, email, phone, address } = userauth.user;
    setname(name);
    setemail(email);
    setphone(phone);
    setaddress(address);
  }, [userauth?.user]);

  return (
    <div className="edituser">
      <form onSubmit={updateuser}>
        <input
          type="text"
          value={name}
          placeholder="enter your name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="enter your email"
          disabled
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          placeholder="enter your phone"
          onChange={(e) => setphone(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="enter your address"
          onChange={(e) => setaddress(e.target.value)}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default Edituser;
