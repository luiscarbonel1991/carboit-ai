import {MainNavItem} from "@/types/nav"
import {LuSettings2} from "react-icons/lu";

interface NavConfig {
    main: MainNavItem[]
}

export const navConfig: NavConfig = {
    main: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: "Chat PDF",
            href: "/chat-pdf"
        },
        {
            title: "Settings",
            href: "/billing",
            lucideIcon: LuSettings2
        }
    ] as MainNavItem[],
};

export const getNavConfig = () => {
    return {
        main: navConfig.main.filter((item) => !item.disabled),
    };
}