import {MainNavItem, SidebarNavItem} from "@/types/nav"
import { HomeIcon, ImageOffIcon, ImagesIcon, LayersIcon, PaletteIcon, RotateCcwIcon, ScissorsIcon, Wand2 } from "lucide-react";
import {LuSettings2} from "react-icons/lu";

interface NavConfig {
    main: MainNavItem[];
    sidebar: SidebarNavItem[]
}

export const navConfig: NavConfig = {
    main: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: "Chat PDF",
            href: "/chat-pdf",
            disabled: true
        },
        {
            title: "Images",
            href: "/images",
            disabled: false
        },
        {
            title: "Settings",
            href: "/billing",
            lucideIcon: LuSettings2,
            disabled: true
        }
    ] as MainNavItem[],
    sidebar: [
        {
            title: "Home",
            href: "/",
            items: [],
            disabled: false
        },
        {
            title: "Images",
            href: "/images",
            lucideIcon: ImagesIcon,
            disabled: false,
            items: [
                {
                    title: "Home",
                    href: "/images",
                    lucideIcon: HomeIcon,
                    items: [],
                    disabled: false
                },
                {
                    title: "Background Remover",
                    href: "/images/add/removeBackground",
                    lucideIcon: LayersIcon,
                    items: [],
                    disabled: false
                },
                {
                    title: "Restore Image",
                    href: "/images/add/restore",
                    lucideIcon: RotateCcwIcon,
                    items: [],
                    disabled: false
                },
                {
                    title: "Generative Fill",
                    href: "/images/add/fill",
                    lucideIcon: Wand2,
                    items: [],
                    disabled: false
                },
                {
                    title: "Object Remove",
                    href: "/images/add/remove",
                    lucideIcon: ScissorsIcon,
                    items: [],
                    disabled: false
                },
                {
                    title: "Object Recolor",
                    href: "/images/add/recolor",
                    lucideIcon: PaletteIcon,
                    items: [],
                    disabled: false
                }
            ]
        },
       
    ]
    
};

export const getNavConfig = () => {
    return {
        main: navConfig.main.filter((item) => !item.disabled),
        sidebar: navConfig.sidebar.filter((item) => !item.disabled)
    };
}