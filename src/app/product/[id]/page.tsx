import Price from "@/components/Price";
import { singleProduct } from "@/data";
import { product1 } from "@/type";
import Image from "next/image";
import React from "react";



const getdata =async ( id:string )=>{
  const value =await fetch(`http://localhost:3000/api/products/${id}`,{cache:'no-cache'})
  const allvalue = await value.json()

  
  return allvalue
  }
  

const SingleProductPage =async ({params}:{params:{id:string}}) => {
  const value:product1 =await getdata(params.id)
  


  
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {value.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={value.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{value.title}</h1>
        <p>{value.desc}</p>
      
        {
          value?.options?.length != 0 ?
          <Price price={value.price} id={value.id}  options={value.options}/>:
          <Price price={value.price} id={value.id}  />
        }
      </div>
    </div>
  );
};

export default SingleProductPage;
