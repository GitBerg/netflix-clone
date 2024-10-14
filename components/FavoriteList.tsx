'use client'

import { Movie } from "@prisma/client"
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"
import useFavorites from "@/hooks/useFavorites"

interface FavoriteListProps {
    title: string
}

const FavoriteList: React.FC<FavoriteListProps> = ({title}) => {

    const {data: favorites = []} = useFavorites()

    if (isEmpty(favorites)) {
        return null
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div className="">
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {favorites.map((movie:Movie) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FavoriteList