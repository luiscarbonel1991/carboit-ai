import MobileNav from "@/components/main/mobile-nav"
import Sidebar from "@/components/images/sidebar"


interface ImagesLayoutProps {
    children: React.ReactNode
}


const ImagesLayout = ({ children }: ImagesLayoutProps) => {
    return (
        <main className="root">
            <Sidebar />

            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>

            {/* <Toaster /> */}
        </main>
    )

}

export default ImagesLayout