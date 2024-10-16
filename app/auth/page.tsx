'use client';

import Input from "@/components/Input"
import { useCallback, useState } from "react"
import axios from "axios";
import { signIn } from "next-auth/react"

import { useRouter } from "next/navigation";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from "next/image";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const [variant, setVariant] = useState('login');
    
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : "login")
    }, [])

    const login = useCallback(async () => {
        try {
            const data = await signIn('credentials', {
                email,
                password,
                redirect: false,
                redirectTo: '/'
            })

            if(data?.error) {
                return router.push('/')
            }
             router.push('/profiles')

        } catch (error) {
            throw new Error('Invalid credentials')
        }
    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('/register', {
                name,
                email,
                password  
            })

            login()
        } catch (error) {
            throw new Error('Invalid credentials')
        }
    }, [name, email, password, login]);


    return (
        <div className="relative  h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover overflow-hidden">
            <div className="bg-black w-full h-full sm:bg-opacity-50">
                <nav className="px-12 py-5 min-w-[350px] flex justify-center sm:justify-between">
                    <Image src="/images/logo.png" alt="logo" className="h-12" width={220} height={500} />
                </nav>
                <div className="flex justify-center min-w-[220px]">
                    <div className="w-full bg-black bg-opacity-70 px-4 py-16 self-center mt-2 sm:w-[450px] sm:px-16 lg:max-w-md rounded-md">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign In' : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input 
                                label="Username"
                                onChange={(ev:any) => setName(ev.target.value)}
                                id="name"
                                type="name"
                                value={name}
                            />
                            )}
                            <Input 
                                label="Email"
                                onChange={(ev:any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(ev:any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === "login" ? "Login" : "Sign up" }
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div 
                                onClick={() => signIn('google', { redirectTo: '/profiles'} )} 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div 
                                onClick={() => signIn('github', { redirectTo: '/profiles'})} 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                            </div>  
                        </div>  
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                            {variant === "login" ? "Create an account " : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth