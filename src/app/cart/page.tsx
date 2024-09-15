"use client"
import { cart, cat } from "@/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
 
const fetcher = () => fetch('http://localhost:3000/api/cart',{cache:'no-cache'}).then((res) => res.json())



const CartPage = () => {

  const { data, error,mutate } = useSWR<cart>('http://localhost:3000/api/cart', fetcher)
  const [vals, setVals] = useState([{}]);
  const {data:session}= useSession()

  useEffect(() => {
    if (data) {
      // Create a new array by mapping over data and adding three new objects for each item
      const newVals = data.flatMap((res) => [
        { title: res.product.title },  // Original title from the data
      ]);
  
      setVals(newVals);
    }
  }, [data]);


  let val=0;

const order =async (e:React.MouseEvent<HTMLButtonElement>) =>{
  e.preventDefault()
let a =  await fetch('http://localhost:3000/api/order',{
  method:"POST",
  headers:{
    "Content-Type": "application/json"
  },
body:JSON.stringify({price:val ,products:vals,status:"pending",userEmail:session?.user.email})
})
if(a.ok){
  alert("success")
   await fetch(`http://localhost:3000/api/cart/?email=${session?.user.email}`,{
    method:"DELETE",
   })
   mutate()
}
}
  
 

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
     {
      data?.length != 0 ?
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
      {
   data? data.map((res,index)=>{
    val = val+parseInt(res.price.toString());
         return(
           <div key={res.id} className="flex items-center justify-between mb-4">
         <Image src={res.product.img} alt="" width={100} height={100} />
         <div className="">
           <h1 className="uppercase text-xl font-bold">{res.product.title}</h1>
           <span>Large</span>
         </div>
         <h2 className="font-bold">{res.price}</h2>
         <span className="cursor-pointer">X</span>
       </div>
         )
       }) :null
     }
     </div>
      :<p>no orders</p>
     }
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal (3 items)</span>
          <span className="">{val}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">{val}</span>
        </div>
        <button  className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end" onClick={(e)=>{order(e)}}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;
