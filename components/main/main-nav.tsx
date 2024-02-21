"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { getNavConfig } from "@/config/nav-config";
import { NavList } from "@/components/nav-list";
import MobileNav from "./mobile-nav";


export const MainNav = () => {

    const pathname = usePathname();
    const { main: mainNav } = getNavConfig()

    return (
        <nav className="md:ml-auto justify-end  w-full flex items-center gap-x-2">

            {/* <NavList pathname={pathname} navItems={mainNav} /> */}

            <UserButton />

            <MobileNav/>
        </nav>
    );
}
