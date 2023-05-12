import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [secretanswer, setsecretanswer] = useState("");
  const navigate =useNavigate();

 const register =async(e)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/register",{
        name,email,phone,password,address,secretanswer
    })
    if(response.status ===200){
          navigate("/login")
    }
    else{
        alert("registration failed");
    }
 }



  return (
    <div className="register">
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="number"
          placeholder="enter your phone no"
          onChange={(e) => setphone(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your address"
          onChange={(e) => setaddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your secret answer"
          onChange={(e) => setsecretanswer(e.target.value)}
        />
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Register;
