import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Forgotpassword = () => {
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [secretanswer, setsecretanswer] = useState("");
  const navigate = useNavigate();

  const passwordreset = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/forgotpassword", {
      email,
      newpassword,
      secretanswer
    });
    if (response.status === 200) {
      navigate("/login");
    } else {
      alert("password updation failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={passwordreset}>
        <input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your secret answer"
          onChange={(e) => setsecretanswer(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setnewpassword(e.target.value)}
        />
        <button>update password</button>
      </form>
    </div>
  );
};

export default Forgotpassword;


