"use client";


import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export const ImageSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                const newUrl = formUrlQuery({
                    searchParams: searchParams.toString(),
                    key: "query",
                    value: query,
                });

                router.push(newUrl, { scroll: false });
            } else {
                const newUrl = removeKeysFromQuery({
                    searchParams: searchParams.toString(),
                    keysToRemove: ["query"],
                });

                router.push(newUrl, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [router, searchParams, query]);

    return (
        <div className="flex w-full md:max-w-96">
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <Input
                    id="default-search"
                    className="block w-full p-6 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Find inspiration..."
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
};