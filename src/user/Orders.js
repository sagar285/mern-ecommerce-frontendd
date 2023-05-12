import React,{useState,useEffect} from 'react'
import Usermenu from '../components/Usermenu'
import axios from 'axios'
import { useAuth } from '../pages/Usercontext'
import moment from "moment"

const Orders = () => {
    const [order,setorders]=useState([])
    const [userauth,setuserauth]=useAuth();

  const getorders =async()=>{
    try {
        const {data} =await axios.get("http://localhost:8080/userorders")
        console.log(data)
        setorders(data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    if(userauth?.token)getorders();
  },[userauth?.token])


  return (
    <div className='order'>
        <Usermenu/>
        <h1>All orders</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>date</th>
                    <th>Payment</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            {
                order?.map((o,i)=>(
                    <div className='main2'>
                        <div>
                        <tbody>
                            <tr>
                                <td>{i+1}</td>
                                <td>{o?.status}</td>
                                <td>{o?.buyer?.name}</td>
                                <td>{moment(o?.createdAt).fromNow()}</td>
                                <td>{o?.payment.success ? "success":"failed"}</td>
                                <td>{o?.products?.length}</td>
                            </tr>
                        </tbody>
                        </div>
                     {o?.products?.map((p,i)=>(
                        <div key={p._id} className='main'>
                          <div>
                            <img src={`http://localhost:8080/uploads/${p.img}`}width={200}/>
                            </div>
                            <div>
                                <p>{p.name}</p>
                                <p>{p.description}</p>
                                <p>{p.price}</p>
                            </div>
                        </div>
                     ))}

                    </div>
                ))}
        </table>
    </div>
  )
}

export default Orders