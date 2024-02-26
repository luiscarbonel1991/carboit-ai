"use server";

import { redirect } from "next/navigation";
import { stripe } from "../stripe";
import { absoluteUrl, handleError } from "../utils";
import { dbConnect } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateUserCreditBalance } from "./user.action";
import { auth, currentUser } from "@clerk/nextjs";

const settingsUrl = absoluteUrl("/profile");

export const checkoutCredits = async (transaction: CheckoutTransactionParams) => {

    try {

        const { userId } = auth();
        const user = await currentUser();
        if (!userId || !user) {
            return {
                url: null,
                error: "User unauthorized"
            }
        }
        const amount = Number(transaction.amount) * 100;

        const session = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: amount,
                        product_data: {
                            name: transaction.plan,
                        },
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                plan: transaction.plan,
                credits: transaction.credits,
                buyerId: transaction.buyerId,
            }
        })

        return {
            url: session.url,
            error: null
        }
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return {
            url: null,
            error: "Error processing payment"
        }
    }
}


export const createTransaction = async (transaction: CreateTransactionParams) => {
    try {

        await dbConnect();

        const newTransaction = await Transaction.create({
            ...transaction,
            buyer: transaction.buyerId,
        });

        await updateUserCreditBalance(transaction.buyerId, transaction.credits)

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        handleError(error);
    }

}