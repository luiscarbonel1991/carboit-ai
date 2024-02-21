import MaxWidthWrapper from "@/components/max-width-wrapper";
import { tools } from "@/config/tools";
import Link from "next/link";
import {
    Card,
    CardHeader
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const DashBoardPage = () => {



    return (
        <MaxWidthWrapper>
            <section className={"flex-1 space-y-10 p-8 pt-6"}>
                <div className={"flex flex-col justify-center items-center space-y-4"}>
                    <h1 className={"text-2xl md:text-4xl font-bold text-center"}>Dashboard</h1>
                    <p className={"text-muted-foreground font-light text-sm lg:text-lg text-center"}>
                        Explore the best tools and resources for your next project.
                    </p>
                </div>

                <div className="px-4 md:px-20 lg:px-48 space-y-4">
                    {tools.filter(data => !data.disable).map((tool, index) => (
                        <Link
                            href={tool.link}
                            key={tool.link}
                        >
                            <Card
                                className="cursor-pointer rounded-3xl border border-gray-200/50 hover:shadow-md hover:border-gray-200/100 duration-500 hover:scale-105 transition"
                            >
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-x-4 items-center">
                                        <div className={cn("rounded-md p-2", tool.bgColor)}>
                                            <tool.icon className={
                                                cn("h-8 w-8", tool.color)
                                            } />
                                        </div>
                                        <h2 className="text-lg font-semibold">{tool.name}</h2>
                                    </div>
                                    <ArrowRight className="h-6 w-6" />
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default DashBoardPage