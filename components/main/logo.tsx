import Link from "next/link";
import {FiActivity} from "react-icons/fi";
import {siteConfig} from "@/config/site";

export const Logo = () => {
    return (
        <Link href="/" className="mr-6 flex items-center space-x-2 w-full">
            {/*<Icons.logo className="h-6 w-6" />*/}
            <FiActivity className="h-6 w-6"/>
            <span className="font-bold sm:inline-block">
                {siteConfig.name}
            </span>
        </Link>
    );
};