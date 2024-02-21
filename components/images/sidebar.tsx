"use client";

import { CameraIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

const imageTools = [
    {
        label: "Background remove",
        link: "/images/add/remove-background",
        icon: CameraIcon
    }
]


const Sidebar = () => {

    const pathname = usePathname();
    return (
        <aside className="hidden h-screen w-72 bg-background p-5 shadow-md shadow-purple-200/50 lg:flex">

            <nav className="h-full flex-col justify-between md:flex md:gap-4">
                <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                    {imageTools.map((tool, index) => {
                        const isActive = tool.link === pathname
                        return (
                            <li key={tool.link}>
                                <Link href={tool.link}>
                                    <Button className="flex gap-4" size={"lg"}
                                    variant={isActive ? "default" : "outline"}
                                    >
                                        <tool.icon className="w-6 h-6" />
                                        <span>{tool.label}</span>
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