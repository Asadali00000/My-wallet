"use client"
import { AppBar } from "@repo/ui/appbar"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const AppBarUser = () => {
    const router = useRouter();
    const session = useSession();
    return <>
        <AppBar onSignin={signIn} onSignout={async () => {
            await signOut();
            router.push("/api/auth/signin");

        }} user={session.data?.user}/>


    </>
}
