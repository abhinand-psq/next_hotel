import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import authOptions from "@/components/auth"

const prisma = new PrismaClient()

export const POST = async(req:NextRequest)=>{
    const val =await req.json()
    console.log(val);
        
 try{
    const data =  await prisma.cart.create({data:val})
    console.log(data);
    return new NextResponse(JSON.stringify(data),{status:200})
 }catch{
    return new NextResponse(JSON.stringify("error"),{status:200})
 }
}


export const GET = async(req:NextRequest)=>{
 const val = await  getServerSession(authOptions)
 
 try{
    const data =  await prisma.cart.findMany({where:{userEmail:val?.user.email!},include:{product:true}})
    return new NextResponse(JSON.stringify(data),{status:200})
 }catch{
    return new NextResponse(JSON.stringify("error"),{status:200})
 }
}

export const DELETE = async(req:NextRequest)=>{
   const val = await  getServerSession(authOptions)
   const vals = new URL(req.url)
       const email =  vals.searchParams.get('email')
   try{
      const data =  await prisma.cart.deleteMany({where:{userEmail:email!}})
      return new NextResponse(JSON.stringify(data),{status:200})
   }catch{
      return new NextResponse(JSON.stringify("error"),{status:200})
   }
  }

