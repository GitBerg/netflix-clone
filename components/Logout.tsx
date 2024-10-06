'use client'

import { signOut } from "next-auth/react"

export const LogOut = () => {
    return(
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    )
}