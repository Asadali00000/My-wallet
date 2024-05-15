import express from 'express'
import db from "@repo/db/client"
const app= express();

app.post('/hdfcWebhook',async (req,res)=>{
    const paymentInformation={
        token:req.body.token,
        userId:req.body.userid,
        amount:req.body.amount,
    };

    try{

    await db.$transaction([

        db.balance.updateMany({
            where:{
                userId:paymentInformation.userId
            },
            data:{
                amount:{
                    increment:paymentInformation.amount
                }
            }
        }),
        db.onRampTransaction.updateMany({
            where: {
                token:paymentInformation.token
            },
            data:{
                status:"Success",
            }
        })
    ])
        res.status(200).json({
            message:"Payment Successful"
        })
        
    }catch(e){
    res.status(411).json({
        message:"Payment Failed"
    })
}

})

app.listen(3003);