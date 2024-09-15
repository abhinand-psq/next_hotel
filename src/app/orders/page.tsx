"use client"
import { order } from "@/type";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
const fetcher = () => fetch('http://localhost:3000/api/order').then((res) => res.json())





const OrdersPage = () => {

  const {data:session}= useSession()

  const { data, error ,mutate} = useSWR('http://localhost:3000/api/order', fetcher)

  const [first, setfirst] = useState([{status:"delivered"},{status:"on the way"},{status:"preparing"}])
  const [change,setchange] = useState(false)

  const update = async(e:React.MouseEvent<HTMLButtonElement>,value:string,id:string) =>{
  e.preventDefault()
  fetch('http://localhost:3000/api/order',{
    method:"PUT",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({value,id})
  })
  mutate()
  }

  const extractDateTime = (timestamp: string) => {
    const dateObj = new Date(timestamp);   
    const date = dateObj.toLocaleDateString('en-CA'); 
    const time = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, 
    });
    return { date, time };
  };

 

  
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
         
         {
          data?.map((res:order)=>{
            const { date, time } = extractDateTime(res.createdAt.toString());
            return(
              <tr key={res.id} className={`text-sm md:text-base ${change ? `bg-white` :'bg-red-300'}`}>
            <td className="hidden md:block py-6 px-1">1237861238721</td>
            <td className="py-6 px-1">{`${date} ${time}`}</td>
            <td className="py-6 px-1">{res.price}</td>
           <div className="flex">
           {
              res?.products?.length > 1 ?  res?.products?.map((res)=>{
                return(
                
                   <td key={res.title} className="hidden md:block  px-1">{res.title}</td>
             
                )
              }) :
                <td className="hidden md:block py-6 px-1">{res.products[0].title}</td>
            }
           </div>
           
            <td className="py-6 px-1">{res.status}</td>
        {  session?.user.isadmin ?  <div className="flex">
            {
              first.map((ress)=>{
              return(
                <div key={ress.status}>
                  <td className="py-2 px-1"><button onClick={(e)=>{update(e,ress.status,res.id)
                   
                  }}>{ress.status}</button></td>
                </div>
              )
              })
            }
            </div> : "" }
          </tr>
            )
          })
         } 
          
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
