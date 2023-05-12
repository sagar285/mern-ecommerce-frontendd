import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from './Cartcontext'

const Productdetail = () => {
const [product, setproduct] = useState({})
    const {id}=useParams();
const [cart,setcart]=useCart();

    function addtocart(val){
        setcart([...cart,val])
        localStorage.setItem("cart",JSON.stringify([...cart,val]))
        alert("item added to cart");
    }


    const singleproduct =async()=>{
        const {data}=await axios.get(`http://localhost:8080/singleproduct/${id}`)
        console.log(data)
        setproduct(data.product)
    }

    useEffect(()=>{
       singleproduct();
    },[])



  return (
    <div className='productdetail'>
        <img src={`http://localhost:8080/uploads/${product.img}`} width={200}/>
        <div className='detailchild'>
            <h2><span>Name:</span>{product.name}</h2>
            <h2><span>Description:</span>{product.description}</h2>
            <h2><span>Price:</span>{product.price}</h2>
            <h2><span>Category:</span>{product.category}</h2>
            <button onClick={()=>addtocart(product)}>Add To CART</button>
        </div>
    </div>
  )
}

export default Productdetail