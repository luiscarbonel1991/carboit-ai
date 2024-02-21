import {Files, Images} from "lucide-react";

export const tools = [
    {
        name: "Chat with PDF",
        description: "A tool to chat with PDFs",
        link: "/chat-pdf",
        icon: Files,
        color: "text-violet-500",
        bgColor: "bg-blue-500/50",
        disable: true
    },
    {
        name: "Generate Images",
        description: "A tool to generate images",
        link: "/images",
        icon: Images,
        color: "text-violet-500",
        bgColor: "bg-blue-500/50",
        disable: false
    }
]