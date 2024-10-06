import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { compare,  } from "bcrypt"
import prismadb from '@/lib/prismadb'
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        profile(profile){
          return{
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email || profile?.login,
            image: profile.avatar_url,
          }
        },
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Credentials({
        id: "credentials",
        name: 'Credentials',
        credentials: {
          email: {
            label: "Email",
            type: "text",
          },
          password: { 
            label: "Password",
            type: "password",
          },
        },
        authorize: async (credentials) => {
            let user = null
            
            if(!credentials?.email || !credentials?.password){
            throw new Error("Email and password required")
            }
            
            user = await prismadb.user.findUnique({
            where: {
                email: credentials.email as string,
            }
            }); 
            if(!user || !user.hashedPassword){
                throw new Error("Email does not exist");
            }   
            const isCorrectPassword = await compare(
                credentials.password as string,
                user.hashedPassword 
            )

            if(!isCorrectPassword){
                throw new Error("Incorrect password");
            }

          return user
        },
      }),
    ],  
    pages:{
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === "development",
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
 