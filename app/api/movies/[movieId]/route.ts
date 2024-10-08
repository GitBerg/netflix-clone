import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

import { NextRequest } from 'next/server';

export async function GET({ params }: { params: { movieId: string } }) {
    try {
        await serverAuth()

        const { movieId } = params

        if(typeof movieId !== 'string') {
            throw new Error('Invalid ID')
        }

        if(!movieId) {
            throw new Error('Invalid ID')
        }
        
        return new Response(JSON.stringify(movieId), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 400 })
    }
}