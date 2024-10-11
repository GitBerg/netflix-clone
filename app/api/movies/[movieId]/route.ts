import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await serverAuth()

        const movieId  = req.nextUrl.pathname.split('/')[3]
        
        if(typeof movieId !== 'string') {
            throw new Error('Invalid ID')
        }

        if(!movieId) {
            throw new Error('Invalid ID')
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!movie) {
            throw new Error('Invalid ID')
        }
        
        return new Response(JSON.stringify(movie), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}