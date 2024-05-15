"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";

import { P2P } from "../app/lib/actions/p2pSendMoney";
import { useState } from "react";


  export function P2pTransferCard(){
     const [amount ,setAmount]=useState(0);
     const [number ,setNumber]=useState("");
    return<Card title={"Send"}>

        <div className=" w-full">
            <TextInput label={"Number"} placeholder={"12345678910"} onChange={(value)=>{setNumber(value)}} />
        </div>
        

        <div className=" w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value)=>{setAmount(Number(value))}} />
        </div>
        <div className="pt-4 flex justify-center">

        <Button onClick={async ()=>{
           await P2P(number,amount*100);

        }}>
            Send

        </Button>
        </div>
        


    </Card>
}