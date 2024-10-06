'use client'

import useCurrentUser from "@/hooks/useCurrentUser"

export const Welcome = () => {

    const {data: currentUser} = useCurrentUser()
    
    return (
      <h1 className="text-white">Logged in as {currentUser?.email}</h1>
    )
}