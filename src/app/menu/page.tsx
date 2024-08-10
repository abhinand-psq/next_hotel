
import Link from "next/link";
import React from "react";
import { categorys } from "../type";
import { cat } from "@/type";




const getdata = async ()=>{
const value = await fetch('http://localhost:3000/api/catog',{cache:'no-cache'})
const value1 = await value.json()
return value1
}



const MenuPage = async() => {
  const data:cat = await getdata()
  const num = Math.floor(Math.random() * 4)
  data.splice(1,1);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {data.map((category) => (

        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2"
          // style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-white; w-1/2`} > 
            <h1 className="uppercase font-bold text-3xl">{category.color}</h1>
             <p className="text-sm my-8">{category.desc}</p> 
            <button className={`hidden 2xl:block bg-${`black`} text-"red-500"} py-2 px-4 rounded-md`}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;