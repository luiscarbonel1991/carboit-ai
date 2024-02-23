"use client";

import {useEffect, useState} from "react";
import InsuficientCreditModal from "./insufficient-credit-modal";


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <InsuficientCreditModal/>
    )

}

export default ModalProvider;