import HeaderContent from "@/components/header-content";
import { Button } from "@/components/ui/button";
import { getNavConfig } from "@/config/nav-config";
import { siteConfig } from "@/config/site";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { SearchParamProps } from "@/types/image-transformation";
import { getAllImages } from "@/lib/actions/image.action";
import { ImageCollection } from "@/components/images/image-collections";


const imageTools = getNavConfig().sidebar.filter((item) => item.href === "/images")[0].items

const ImagesHomePage = async ({ searchParams }: SearchParamProps) => {

    const page = Number(searchParams?.page) || 1;
    const searchQuery = (searchParams?.query as string) || '';

    const images = await getAllImages({ page, searchQuery })

    return (
        <>
            <section className="hidden md:flex flex-center h-80 flex-col justify-center gap-12 rounded-[20px] border bg-gradient-to-r from-blue-600 to-violet-600 bg-cover bg-no-repeat p-10 shadow-inner">
                <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                    Unlock the power of AI Images with {` `} <span
                        className="bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent">{siteConfig.name}</span>
                </h1>

                <TooltipProvider>
                    <ul className="flex justify-center w-full gap-20">
                        {imageTools.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href || '/'}
                            >
                                <Tooltip>
                                    <TooltipTrigger>
                                        <li className="flex justify-center items-center w-fit rounded-full bg-white p-2 
                        hover:scale-110 transition duration-300"
                                        >
                                            <Button size={"icon"} variant={"ghost"} asChild>
                                                {item.lucideIcon && <item.lucideIcon />}
                                            </Button>
                                        </li>
                                    </TooltipTrigger>
                                    <TooltipContent className="inline-flex items-center rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium">
                                        {item.title}
                                    </TooltipContent>
                                </Tooltip>

                            </Link>
                        ))}
                    </ul>
                </TooltipProvider>
            </section>

            <section className="sm:mt-12">
                <ImageCollection
                    hasSearch={true}
                    images={images?.data}
                    totalPages={images?.totalPage}
                    page={page}
                />
            </section>
        </>
    );
}

export default ImagesHomePage;