import React,{useState, useEffect,createContext,useContext} from 'react'


   const Cartcontext =createContext()
const CartProvider = ({children}) => {
const [cart, setcart] = useState([])


useEffect(()=>{
  let existitem =localStorage.getItem("cart")
  if(existitem) setcart(JSON.parse(existitem));
},[])


  return (
    <Cartcontext.Provider value={[cart,setcart]}>
        {children}
    </Cartcontext.Provider>
  )
}

// custom hook

const useCart =()=>useContext(Cartcontext)

export {useCart,CartProvider}