import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import FavoriteList from "@/components/FavoriteList";
import InfoModal from "@/components/InfoModal";


export default async function Home() {
  
  const session = await auth()

  if(!session) {
    redirect('/auth')
  }

  return (
    <>
      <InfoModal/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now"/>
        <FavoriteList title="My List" />
      </div>
    </>
    )  
}

