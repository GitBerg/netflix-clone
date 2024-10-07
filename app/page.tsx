import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

export default async function Home() {
  
  const session = await auth()

  if(!session) {
    redirect('/auth')
  }

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" />
      </div>
    </>
    )  
}

