import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const MaxWidthWrapper =  ({
    className,
    children
}: MaxWidthWrapperProps) => {
    return (
        <div className={cn(
            `mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8`,
            className
        )}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper