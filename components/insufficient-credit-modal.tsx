"use client";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useToast} from "@/components/ui/use-toast";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useInsuficientCreditModal } from "@/hooks/use-insufficient-credit-modal";


const InsuficientCreditModal = () => {

    const { toast } = useToast();
    const insufficientCreditModal = useInsuficientCreditModal();

    return (
        <Dialog open={insufficientCreditModal.isOpen} onOpenChange={insufficientCreditModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            By more credits
                            <Badge  className="uppercase text-sm py-1">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    {/* <DialogHeader className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Link
                                href={tool.link}
                                key={tool.link}
                            >
                                <Card className="p-3 border-black/5 flex items-center justify-between">
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.name}
                                        </div>
                                    </div>
                                    <Check className="text-primary w-5 h-5"/>
                                </Card>
                            </Link>
                        ))}
                    </DialogHeader> */}
                </DialogHeader>
                <DialogFooter>
                    <Button className="w-full">
                        By more credits
                        <Zap className="w-5 h-5 ml-2"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default InsuficientCreditModal