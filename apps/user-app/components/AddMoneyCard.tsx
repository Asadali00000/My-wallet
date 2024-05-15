"use client"

import { Card } from "@repo/ui/card"
import { useState } from "react"
import { TextInput } from "@repo/ui/textinput"
import { Select } from "@repo/ui/select"
import { Button } from "@repo/ui/button"
import { onRampTransactions } from "../app/lib/actions/onRampTransactions"

const banks = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}
]
export  function AddMoneyCard() {
    const [redirectUrl, setRedirectUrl] = useState(banks[0]?.redirectUrl)
    const [amount ,setAmount]=useState(0);
    const [provider,setProvider]=useState(banks[0]?.name || "");
    return <Card title="Add Money">

        <div className="w-full ">

            <TextInput placeholder="Amount" label="Amount" onChange={(value) => {setAmount(Number(value)) }} />

            <div className=" py-4 text-left">


                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(banks.find(x => x.name === value)?.redirectUrl || " ")
                setProvider(value);
            }} options={
                banks.map(x => ({
                    key: x.name,
                    value: x.redirectUrl
                }))
            }>

            </Select>
            <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                await onRampTransactions(amount*100,provider);
                window.location.href = redirectUrl || "";
                
            }}>
            Add Money
            </Button>
        </div>
      

         
       </div>
    </Card>
}