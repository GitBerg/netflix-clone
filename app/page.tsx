import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

export default async function Home() {
  
  const session = await auth()

  if(!session) {
    redirect('/auth')
  }


  return (
    <>
      <Navbar />
      <Billboard />
    </>
    )  
}

