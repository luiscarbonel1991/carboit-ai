import {create} from 'zustand';

interface useInsuficientCreditModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useInsuficientCreditModal = create<useInsuficientCreditModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));