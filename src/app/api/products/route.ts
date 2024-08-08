import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
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

