import MobileNav from "@/components/main/mobile-nav"
import Sidebar from "@/components/images/sidebar"


interface ImagesLayoutProps {
    children: React.ReactNode
}


const ImagesLayout = ({ children }: ImagesLayoutProps) => {
    return (
        <main className="flex min-h-screen w-full flex-col bg-background lg:flex-row">
            <Sidebar />

            <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
                <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
                    {children}
                </div>
            </div>

            {/* <Toaster /> */}
        </main>
    )

}

export default ImagesLayout