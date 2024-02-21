"use client";
import React from "react";
import { CameraIcon, Link } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getNavConfig } from "@/config/nav-config";
import { ScrollArea } from "../ui/scroll-area";
import { MobileLink } from "./mobile-link";
import { useState } from "react";
import { Logo } from "./logo";
import { UserButton } from "@clerk/nextjs";

const imageTools = [
    {
        label: "Background remove",
        link: "/images/add/remove-background",
        icon: CameraIcon
    }
]


const MobileNav = () => {

    const pathname = usePathname();
    const { sidebar: sidebarNav, main: mainNav } = getNavConfig();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    >
                        <svg
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transform rotate-180"
                        >
                            <path
                                d="M3 5H11"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M3 12H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M3 19H21"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>


                <SheetContent side="right" className="w-full max-w-[90vw] md:max-w-[400px]">

                    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                        {/* <div className="flex flex-col space-y-3">
                            {mainNav?.map(
                                (item) =>
                                    item.href && (
                                        <MobileLink
                                            key={item.href}
                                            href={item.href}
                                            onOpenChange={setIsOpen}
                                        >
                                            {item.title}
                                        </MobileLink>
                                    )
                            )}
                        </div> */}

                        <div className="flex flex-col space-y-3">
                            <Logo />
                        </div>
                        <div className="flex flex-col space-y-2">
                            {sidebarNav.map((item, index) => (
                                <div key={index} className="flex flex-col space-y-3 pt-6">
                                    <h4 className="font-medium">{item.title}</h4>
                                    {item?.items?.length > 0 &&
                                        item.items.map((item) => (
                                            <React.Fragment key={item.href}>
                                                {!item.disabled &&
                                                    (item.href ? (
                                                        <MobileLink
                                                            href={item.href}
                                                            onOpenChange={setIsOpen}
                                                            className="text-muted-foreground"
                                                        >
                                                            {item.title}
                                                            {item.label && (
                                                                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                        </MobileLink>
                                                    ) : (
                                                        item.title
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </aside>
    )
}

export default MobileNav

