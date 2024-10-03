import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'



export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { name, email, password } = data
        console.log(name, email, password)
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        })

        if (existingUser) {
            return new Response('Email taken', { status: 422 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Internal Error', { status: 400, })
    }
}