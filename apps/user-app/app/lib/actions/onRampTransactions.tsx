"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onRampTransactions(amount:number,provider:string){
    console.log("in ramp");
    const session=await getServerSession(authOptions);
    const userId=session?.user?.id;
    if(!userId){
        return {  message:"user not logged in and add route here"}
    }
    const token=Math.random().toString();
    console.log("in ramp");
    await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            token:token,
            amount:amount,
            status:"Processing",
            provider:provider,
            startTime:new Date()
            
        }
    })
    
    console.log("in ramp");
    
}