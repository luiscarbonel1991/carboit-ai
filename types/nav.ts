import {Icons} from "@/components/icons"
import {LucideIcon} from "lucide-react";

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    lucideIcon?: LucideIcon
    label?: string
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}


export interface MainNavItem extends NavItem {
}

export interface SidebarNavItem extends NavItemWithChildren {
    
}
