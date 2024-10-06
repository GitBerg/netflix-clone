import serverAuth from "@/lib/serverAuth";

export async function GET(){
    try {
        const { currentUser } = await serverAuth()
        return new Response(JSON.stringify(currentUser), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}