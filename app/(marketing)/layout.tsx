import {Header} from "@/app/(marketing)/_components/header";


const MarketingLayout = ({
                             children,
                         }: { children: React.ReactNode }) => {
    return (

        <div
            className="relative flex min-h-screen flex-col bg-background bg-gradient-to-r from-slate-100 to-teal-50">
            <Header/>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout