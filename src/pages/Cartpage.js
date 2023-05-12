
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Usercontext";
import { useCart } from "./Cartcontext";
import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
const Cartpage = () => {
  const [userauth, setuserauth] = useAuth();
  const [cart, setcart] = useCart();
  const [clienttoken, setclienttoken] = useState("");
  const [instance,setinstance]=useState("")
  const navigate = useNavigate();

  const removecartitem = (pid) => {
    let mycart = [...cart];
    let index = mycart.findIndex((item) => item._id === pid);
    mycart.splice(index, 1);
    setcart(mycart);
    localStorage.setItem("cart", JSON.stringify(mycart));
  };

  const totalprice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // payment token
  const gettoken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/braintree/token");
      console.log(data.clientToken);
      setclienttoken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
   

  const handlepayment =async()=>{
    try {
      const {nonce} =await instance.requestPaymentMethod();
      const {data} =await axios.post("http://localhost:8080/braintree/payment",{
        nonce,cart
      })
      localStorage.removeItem("cart");
      setcart([]);
      alert("payment succesfull")
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }


  useEffect(() => {
    gettoken();
  }, [userauth?.token]);

  // handle payment
  // const handlepayment =async()=>{
  //     try {
  //         const {nonce} =await
  //     } catch (error) {

  //     }
  // }

  return (
    <div className="cartpage">
      {/* <h1>{JSON.stringify(userauth,null,4)}</h1> */}
      <h2>
        {!userauth?.user
          ? "Hello Guest"
          : `hello'${userauth?.token && userauth?.user?.name}`}
        <p>
          {cart?.length
            ? `you have ${cart.length} items in your cart ${
                userauth?.token ? "" : "pls login to checkour"
              }`
            : "your cart is empty"}
        </p>
      </h2>
      <div className="parent-cart">
        <div className="container">
        {cart?.map((p) => (
          <>
            <div className="first">
            <img src={`http://localhost:8080/uploads/${p.img}`} width={200} />
            <div>
              <p><span>Product:</span> {p.name.toUpperCase()}</p>
              <p><span>Description:</span>{p.description.substring(0, 10)}</p>
              <p> <span>Price:</span>{p.price}</p>
              <button onClick={() => removecartitem(p._id)}>Remove item </button>
              </div>
            </div>
            </>
        ))}
        </div>
            <div className="second">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total:{totalprice()}</h4>
              {userauth?.user?.address ? (
                <>
                  <div>
                    <h3>Current address</h3>
                    <h5>{userauth?.user?.address}</h5>
                    <button onClick={() => navigate("/dashboard/user/edit")}>
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  {userauth?.token ? (
                    <button onClick={() => navigate("/dashboard/user/edit")}>
                      Update Address
                    </button>
                  ) : (
                    <button onClick={() => navigate("/login")}>
                      pls login to checkout
                    </button>
                  )}
                </div>
              )}
              <div>
                {!clienttoken || !userauth?.token || !cart?.length ?(
                  <>
                  
                  </>
                ):(
                    <>
                    {/* <DropIn options={{
                        authorization:clienttoken,
                        paypal:{
                            flow:"vault"
                        },
                    }}
                    onInstance={(instance)=>setinstance(instance)}
                    /> */}
                    <button className="btn" onClick={handlepayment} disabled ={!userauth?.user?.address || !instance}
                    >Make payment</button>
                    </>
                )}
              </div>
            </div>     
      </div>
    </div>
  );
};

export default Cartpage;
