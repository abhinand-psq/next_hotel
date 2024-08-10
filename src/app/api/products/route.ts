import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
<<<<<<< HEAD
import { NextApiRequest } from "next";

const client = new PrismaClient()
=======
import { URL } from "url";

const prisma = new PrismaClient()

export const GET = async(req:NextRequest)=>{
    const urls = new URL(req.url)
    const ids = urls.searchParams.get("id")
    const value =ids ? {catSlug:ids}  : {isFeatured:true};
 try{
    const data =  await prisma.product.findMany({where:value})
    return new NextResponse(JSON.stringify(data),{status:200})
 }catch{
    return new NextResponse(JSON.stringify("error"),{status:400})
 }
}
>>>>>>> main


  export const  GET =async ()=>{
      
        
    try{
      let a = await client.product.findMany()
      console.log(a);
      
      return new NextResponse(JSON.stringify({val:a}),{status:200})
    }catch(e){
      return new NextResponse(JSON.stringify({val:e}),{status:400})
    }
  }
    
  export const  POST =async ()=>{
    try{
      let a = await client.product.create({data:{prname:"Spaghetti Bolognese",prize:334,slug:"pasta"}})
      return new NextResponse(JSON.stringify({val:a}))
    }catch(e){
      return new NextResponse(JSON.stringify({val:e}))
    }
  }

  