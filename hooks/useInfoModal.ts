'use client'

import { create } from "zustand";

export interface InfoModalState {
    movieId: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModal = create<InfoModalState>((set) => ({
    movieId: '',
    isOpen: false,
    openModal: (movieId: string) => set({ isOpen: true, movieId: movieId }),
    closeModal: () => set({ isOpen: false, movieId: '' }),
}));

export default useInfoModal