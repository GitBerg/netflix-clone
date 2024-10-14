'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/navigation";

 const ProfilesGroup = () => {

    const router = useRouter()
    const {data: user} = useCurrentUser()

    return (
        <div onClick={() => router.push('/')}>
            <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover: border-white
                overflow-hidden">
                    <Image width={500} height={500} src="/images/default-blue.png" alt="Profile" />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                    {user?.name}        
                </div>
            </div>
        </div>
    )
}

export default ProfilesGroup;