"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const dashboardMenu: { title: string; href: string; description: string }[] = [
    {
        title: "AI Tools",
        href: "/dashboard",
        description: "AI tools for image processing and document conversion.",
    },
]

const imageMenu: { title: string; href: string; description: string }[] = [
    {
        title: "Background Remover",
        href: "/images/add/removeBackground",
        description:
            "Remove the background from an image and make it transparent.",
    },
    {
        title: "Restore Image",
        href: "/images/add/restore",
        description: "Refine images by removing noise and imperfections.",
    },
    {
        title: "Generative Fill",
        href: "/images/add/fill",
        description: "Enhance an image's dimensions using AI outpainting.",
    },
    {
        title: "Object Remove",
        href: "/images/add/remove",
        description: "Identify and eliminate objects from images.",
    },
    {
        title: "Object Recolor",
        href: "/images/add/recolor",
        description: "Identify and recolor objects from the image.",
    },
    
]

export function NavigationMenuComponent() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-6 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">

                            {dashboardMenu.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Images</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col gap-3 p-4 md:w-[300px] lg:w-[400px] ">
                            {imageMenu.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
