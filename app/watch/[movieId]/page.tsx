'use client'

import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = ({ params }: { params: { movieId: string } }) => {
    const router = useRouter();
    const { movieId } = params;
    const { data, error, isLoading } = useMovie(movieId as string);
    const [showNav, setShowNav] = useState(false);
    const mouseMovingRef = useRef(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseMove = () => {
        if (!mouseMovingRef.current) {
            setShowNav(true);  
            mouseMovingRef.current = true;
          }
        setShowNav(true);  
        
        if (timerRef.current) clearTimeout(timerRef.current)
    
        timerRef.current = setTimeout(() => {
            setShowNav(false);
            mouseMovingRef.current = false;
          }, 2600);
      };

    useEffect(() => {
        
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timerRef.current) clearTimeout(timerRef.current);
          };
    }, [])

    
    
    return (
        <div className="h-screen w-screen bg-black">
            <nav className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out ${showNav ? 'opacity-100' : 'opacity-0'}`}>
                <AiOutlineArrowLeft className="text-white cursor-pointer" size={40} onClick={() => router.push('/')}/>
                <p className="text-white text-xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video
                autoPlay
                controls
                className="h-full w-full" 
                src={data?.videoUrl}
            >

            </video>

        </div>
    )

}

export default Watch