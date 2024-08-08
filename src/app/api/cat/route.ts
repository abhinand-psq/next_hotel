import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export const GET = async()=>{
    try{
      let a = await client.category.findMany({include:{products:true}})
      return new NextResponse(JSON.stringify(a))
    }catch(e){
      return new NextResponse(JSON.stringify({val:e}))
    }
  }
  
  
  
  export const POST = async()=>{
      try{
        let a = await client.category.findMany({include:{products:true}})
        return new NextResponse(JSON.stringify({val:"ss"}))
      }catch(e){
        return new NextResponse(JSON.stringify({val:e}))
      }
    }
  