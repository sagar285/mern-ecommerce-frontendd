import React,{useState,useEffect, createContext,useContext} from 'react'
import axios from 'axios';
const Authcontext =createContext();

const Usercontext = ({children}) => {
 const [userauth,setuserauth]=useState({
    user:null,
    token:""
 })

// default authorization
axios.defaults.headers.common["Authorization"]=userauth?.token

 useEffect(()=>{
const userdata =localStorage.getItem("auth")
if(userdata){
    const parsedata =JSON.parse(userdata)
    setuserauth({...userauth,user:parsedata.user,token:parsedata.token})
}
 },[])

  return (
    <div>
        <Authcontext.Provider value={[userauth,setuserauth]}>
            {children}
        </Authcontext.Provider>
    </div>
  )
}

// custom hook 
const useAuth =()=>useContext(Authcontext);

export {useAuth,Usercontext}