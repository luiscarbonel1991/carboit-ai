import Link from "next/link"


import {Separator} from "@/components/ui/separator"
import {ArrowRightIcon} from "lucide-react";

export function Announcement() {
    return (
        <Link
            href="/chat-pdf"
            className="inline-flex items-center rounded-lg bg-slate-200 px-3 py-1 text-sm font-medium"
        >
            🎉 <Separator className="mx-2 h-4" orientation="vertical"/>{" "}
            <span className="sm:hidden">Seamless Document Interaction & Beyond.</span>
            <span className="hidden sm:inline">
        Seamless Document Interaction & Beyond.
      </span>
            <ArrowRightIcon className="ml-1 h-4 w-4"/>
        </Link>
    )
}