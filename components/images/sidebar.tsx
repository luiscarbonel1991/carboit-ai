"use client";

import { CameraIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { getNavConfig } from "@/config/nav-config";
import { cn } from "@/lib/utils";

const imageTools = getNavConfig().sidebar.filter((item) => item.href === "/images")[0].items


const Sidebar = () => {

    const pathname = usePathname();
    return (
        <aside className="hidden h-screen w-72 bg-background p-5 shadow-md shadow-purple-200/50 lg:flex">

            <nav className="h-full flex-col justify-between md:flex md:gap-4">
                <ul className="hidden w-full flex-col items-start gap-6 md:flex">
                    {imageTools.map((tool, index) => {
                        const isActive = tool.href === pathname
                        return (
                            <li className="w-full transition duration-300 hover:scale-105" key={tool.href}>
                                <Link href={tool.href || '/'}>
                                    <Button className={
                                        cn(
                                            "flex justify-start gap-4 w-full rounded-3xl",
                                            isActive ? "bg-gradient-to-b from-gray-900 to-gray-600" : ""
                                        )
                                    } size={"lg"}
                                    variant={isActive ? "default" : "outline"}
                                    >
                                        { tool.lucideIcon && <tool.lucideIcon size={24} />}
                                        <span >{tool.title}</span>
                                    </Button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar