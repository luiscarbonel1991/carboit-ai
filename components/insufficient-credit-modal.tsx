"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoinsIcon, Zap } from "lucide-react";
import { useInsuficientCreditModal } from "@/hooks/use-insufficient-credit-modal";


const InsuficientCreditModal = ({
    forceOpen
}: { forceOpen?: boolean}) => {
    const insufficientCreditModal = useInsuficientCreditModal();

    return (
        <Dialog open={forceOpen || insufficientCreditModal.isOpen} onOpenChange={insufficientCreditModal.onClose}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-x-2 font-bold text-xl">
                            Opps! You don&#39;t have enough credits
                            <Badge className="uppercase text-sm py-1">
                                <CoinsIcon className="w-6 h-6 mr-1" />
                            </Badge>
                        </div>
                    </DialogTitle>

                    <DialogDescription>
                        You need more credits to perform this action
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-between">
                    <Button
                        className="rounded-full"
                        variant={"secondary"}
                    >
                        No, thanks
                    </Button>
                    <Button
                        className="rounded-full"
                    >
                        Yes, Proceed
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default InsuficientCreditModal