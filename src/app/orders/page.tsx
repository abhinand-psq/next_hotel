"use client"
import { order } from "@/type";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import useSWR from 'swr'
const fetcher = () => fetch('http://localhost:3000/api/order').then((res) => res.json())
const OrdersPage = () => {

  
  const {data:session}= useSession()
  console.log(session?.user.isadmin);
  console.log(session?.user.name);

  const { data, error } = useSWR('http://localhost:3000/api/order', fetcher)

  
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
            
            return(
              <tr key={res.id} className="text-sm md:text-base bg-red-50">
            <td className="hidden md:block py-6 px-1">1237861238721</td>
            <td className="py-6 px-1">{res.createdAt}</td>
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
