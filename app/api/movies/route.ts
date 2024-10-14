import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        await serverAuth()

        const movies = await prismadb.movie.findMany()

        return new Response(JSON.stringify(movies), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {status: 400})
    }
}