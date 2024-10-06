import { auth } from "@/auth";
import ProfilesGroup from "@/components/ProfilesGroup";
import { redirect } from "next/navigation";

const Profiles = async () => {

    const session = await auth()

    if(!session) {
      redirect('/auth')
    }
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <ProfilesGroup />
                </div>
            </div>
        </div>
    )
}

export default Profiles;