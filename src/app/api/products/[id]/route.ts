import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const GET = async(req:NextRequest,{params}:{params:{id:string}})=>{
    
 try{
    const data =  await prisma.product.findUnique({where:{id:params.id}})
    return new NextResponse(JSON.stringify(data),{status:200})
 }catch{
    return new NextResponse(JSON.stringify("error"),{status:400})
 }
}

