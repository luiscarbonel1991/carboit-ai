import { Header } from "@/components/main/header"




interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div
        className="relative flex min-h-screen flex-col">
        <Header/>
        <main className="flex-1">
            {/* <ModalProvider/> */}
            {children}
        </main>
    </div>
    )
}

export default MainLayout