"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";



type Props = {
  price: any;
  id: string;
  options?: { title: string; additionalPrice: number } [];
};

const Price = ({ price, id, options }: Props) => {

  const {data:session} =  useSession()

  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

console.log(typeof price);
let su =1243


  useEffect(() => {
     setTotal(
      quantity * (options ?  options[selected].additionalPrice: parseInt(price))
    ) 
  }, [quantity, selected, options, price,su]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}      
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500" onClick={(e)=>{
          e.preventDefault()
        fetch('http://localhost:3000/api/cart',{
              method:'POST',
              headers:{"Content-Type": "application/json"},
              body:JSON.stringify({price:total,product_id:id,userEmail:session?.user.email})
        })
        }}>
          Add to Cart
        </button >
      </div>
    </div>
  );
};

export default Price;
