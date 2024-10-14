import prismadb  from '@/lib/prismadb';
import { without } from "lodash"
import serverAuth from '@/lib/serverAuth';

export const dynamic = 'force-dynamic'


export async function POST(req:Request){

    try {
        
        const {currentUser} = await serverAuth()
        const {movieId} = await req.json()

        console.log(movieId)

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!existingMovie){
            throw new Error('Invalid ID')   
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        return new Response(JSON.stringify(user), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {status: 400})
    }
}

export async function DELETE(req:Request){
    try {
        const {currentUser} = await serverAuth()

        const {movieId} = await req.json()

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!existingMovie){
            throw new Error('Invalid ID')
        }

        const updateFavoriteIds = without(currentUser.favoriteIds, movieId)

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: updateFavoriteIds
            }
        })

        return new Response(JSON.stringify(updatedUser), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {status: 400})
    }
}