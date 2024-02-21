import {MainNavItem} from "@/types/nav"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";


export const NavList = ({
                            pathname,
                            navItems
                        }: {
    pathname: string,
    navItems: MainNavItem[] | [];
}) => {

    if (navItems.length === 0) {
        return null;
    }


    return (
        <>
            {
                navItems.map((item, index) => {
                        return (
                            <Link key={item.href} href={item.href ?? '/'}>
                                <Button variant="ghost" size="sm"
                                        className={cn(
                                            "hidden md:flex rounded-3xl gap-1.5 transition-transform hover:text-foreground/80 hover:translate-y-[-1px] hover:scale-[1.01] hover:border-b-2 hover:border-primary",
                                            pathname === item.href ? "text-foreground border-b-2 border-primary" : "text-foreground/60"
                                        )}
                                        key={index}
                                >
                                    {item.title} {item.lucideIcon && <item.lucideIcon className="w-6 h-6"/>}
                                </Button>
                            </Link>
                        )
                    }
                )
            }</>
    )
}