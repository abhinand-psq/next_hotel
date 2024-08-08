import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from "next";

const client = new PrismaClient()


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

  