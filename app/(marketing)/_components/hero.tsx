import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LayoutDashboard, LogIn} from "lucide-react";
import {auth} from "@clerk/nextjs";
import {Announcement} from "@/components/announcement";
import {PageActions, PageHeader, PageHeaderDescription} from "@/components/page-hero";


export const Hero = () => {

    const {userId} = auth();

    return (
        /*<main
            className="isolate container grid lg:grid-cols-1 gap-4 place-items-center pt-32 md:pb-24 px-4 md:px-10">

            {/!*<div className="py-6 md:order-1 hidden md:block">
                <Image
                    priority={true}
                    src="/hero.webp"
                    alt="A studend and a tutor in front of a computer teaching and learning"
                    height={440}
                    width={440}
                    className="rounded-2xl shadow-md"
                />
            </div>*!/}

            <aside className={"text-center"}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                    The best AI {` `} <span
                    className="bg-gradient-to-r from-pink-400 to-indigo-600 bg-clip-text text-transparent">utilities</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                    Make your life easier with our AI utilities. We have a wide range of tools to help you with
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default"
                            className="rounded-3xl transition ease-in-out delay-150 hover:-translate-y-1 scale-105 font-bold"
                            size="lg">
                        <Link
                            href="/dashboard"
                            aria-label="Get Started"
                        >

                            {userId ? "Dashboard" : "Join us now"}
                            {userId
                                ? <LayoutDashboard className="w-6 h-6 ml-2"/>
                                : <LogIn className="w-6 h-6 ml-2"/>
                            }
                        </Link>
                    </Button>
                </div>
            </aside>
        </main>*/


        <PageHeader>

            <Announcement/>
            <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                Your ultimate personal and organization {` `} <span
                className="bg-gradient-to-r from-pink-400 to-indigo-600 bg-clip-text text-transparent">tool</span>
            </h1>
            <PageHeaderDescription>
                Simplify document management, boost productivity, and streamline workflows with our comprehensive suite of AI utilities.
            </PageHeaderDescription>

            <PageActions>
                <Link
                    href="/dashboard"
                    aria-label="Get Started"
                >
                    <Button variant="default"
                            className="rounded-3xl transition ease-in-out delay-150 hover:-translate-y-1 scale-105 font-bold"
                            size="lg">


                        {userId ? "Dashboard" : "Join us now"}
                        {userId
                            ? <LayoutDashboard className="w-6 h-6 ml-2"/>
                            : <LogIn className="w-6 h-6 ml-2"/>
                        }

                    </Button>
                </Link>

            </PageActions>
        </PageHeader>
    );
}