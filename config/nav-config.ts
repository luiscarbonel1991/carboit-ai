import {MainNavItem, SidebarNavItem} from "@/types/nav"
import { ImagesIcon } from "lucide-react";
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
                    title: "Background Remover",
                    href: "/images/add/remove-background",
                    lucideIcon: ImagesIcon,
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