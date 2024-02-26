"use client";

import { checkoutCredits } from "@/lib/actions/transactions.action";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface ByCreditCheckoutProps {

    transaction: CheckoutTransactionParams
}
const ByCreditCheckoutButton = ({
    transaction
}: ByCreditCheckoutProps) => {



    const onCheckoutHandler = async () => {
        try{
            const response = await checkoutCredits(transaction);

            console.log({response});

            if(!response || !response.url) {
                toast({
                    title: "Something went wrong",
                    variant: "destructive",
                    duration: 5000
                })

                return;
            }

            window.location.href = response.url as string;


        } catch (error) {
            console.log(error);
            toast({
                title: "Something went wrong",
                variant: "destructive",
                duration: 5000
            });

        }
    }


    return (
        <form action={onCheckoutHandler}>
             <Button type="submit" className={"w-full"} size={"lg"} variant={"secondary"}>
                  By Credit Now..
              </Button>
        </form>
    )
}

export default ByCreditCheckoutButton;