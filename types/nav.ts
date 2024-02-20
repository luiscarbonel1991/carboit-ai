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

export interface NavItemWithChildrenV2 extends NavItem {
    items: NavItemWithChildrenV2[]
    lucideIcon?: LucideIcon
}

export interface MainNavItem extends NavItem {
}

export interface SidebarNavItem extends NavItemWithChildren {
}

export interface SidebarNavItemV2 extends NavItemWithChildrenV2 {
    lucideIcon?: LucideIcon
}