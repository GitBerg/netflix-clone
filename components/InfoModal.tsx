"use client"

import { useCallback, useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useMovie from "@/hooks/useMovie";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";

import Image from "next/image";



const InfoModal = () => {
    const {isOpen, closeModal } = useInfoModal();
    const [isVisible, setIsVisible] = useState(!!isOpen);


    const { movieId } = useInfoModal();
    const {data = [] } = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        
        setTimeout(() => {
            closeModal();
        }, 300)
    }, [closeModal]);

    if(!isVisible) {
        return null
    }

    return(
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflw-hidden">
                <div className={`${isVisible ? "scale-100" : "scale-0"} transfom duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <Image height={640} width={900} src={data?.thumbnailUrl} className="w-full h-full brightness-[60%] object-cover" alt="Thumbnail"/>
                        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" onClick={handleClose}>
                            <AiOutlineClose size={20} className="text-white"/>
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id}/>
                                <FavoriteButton movieId={data?.id}/>
                            </div>
                        </div>
                    </div>
                <div className="px-12 py-8">
                    <div className="flex justify-between mb-4">
                    <p className="text-green-400 font-semibold text-lg">
                        New
                    </p>
                    <p className="text-white text-sm font-semibold text-justify">
                        {data?.genre} || {data?.duration}
                    </p>
                    </div>
                    <p className="text-white text-lg">
                        {data?.description}
                    </p>
                </div>

                </div>
            </div>
        </div>
    )
}

export default InfoModal