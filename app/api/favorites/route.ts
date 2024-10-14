import prismadb  from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        
        const {currentUser} = await serverAuth()

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds
                }
            }
        })

        return new Response(JSON.stringify(favoriteMovies), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}